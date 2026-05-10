---
title: 'RoboCraft: Scaling robot manipulation data in simulation for general instruction following'
shortTitle: RoboCraft
slug: robocraft
date: '2026-05-05T12:00:00Z'
author: XLANG Lab
coverImage: /blog/xgen/xgen_main.png
previewContent: "RoboCraft is a scalable IsaacLab-based pipeline for generating robot manipulation data in simulation. It builds diverse scenes, synthesizes feasible tasks, generates executable reward code, writes and debugs motion-planning programs through simulation feedback, and rolls out over 1M successful trajectories for VLA training."
onlineImage: https://imgur.com/a/KEfC6ce
githubLink: https://github.com/xlang-ai/OSWorld
layout: robocraft
---

Robot learning is bottlenecked by data. Real robot trajectories are expensive to collect, difficult to annotate, and hard to scale across the long tail of objects, scenes, tasks, camera views, lighting conditions, and contact dynamics. Human videos are abundant on the Internet, and recent work has started to turn them into useful supervision for robot policies [\[1\]](#ref1)[\[2\]](#ref2)[\[12\]](#ref12)[\[13\]](#ref13). However, ordinary videos still lack ground-truth robot actions and must bridge large embodiment gaps before they can directly supervise closed-loop manipulation.

At the same time, modern vision-language-action (VLA) models have shown surprising capabilities on complex long-horizon tasks, from doing laundry to cooking eggs [\[5\]](#ref5)[\[15\]](#ref15). Yet these impressive demonstrations do not mean that general robot instruction following is solved.

In practice, even the strongest VLA models still struggle to generalize to unseen tasks, objects, and environments. For example, even a model like `pi_0.7` can fail on a seemingly simple task such as closing an unseen air fryer. We also observe a common gap in current VLA evaluation: a model may score well on benchmarks such as LIBERO and RoboTwin, but fail when we make a small, natural change to the instruction in the same environment, such as "place the bowl to the left of the wine bottle." This suggests that many models are still learning benchmark-specific task distributions rather than robust, open-ended instruction following.

The motivation of RoboCraft is simple: we believe a general-purpose robot should be able to understand and execute arbitrary, reasonable instructions in arbitrary scenes. RoboCraft is our first step toward this goal.

Today we are introducing **RoboCraft**, an early look at our scalable IsaacLab-based data generation pipeline for robot manipulation. RoboCraft automates the full path from scene construction and task synthesis to reward design, motion-planning code generation, and trajectory rollout. With this pipeline, we generate over **1M successful, domain-randomized manipulation trajectories** across diverse tasks and environments for VLA training.

Several recent works have explored scaling manipulation data in simulation [\[8\]](#ref8)[\[10\]](#ref10)[\[11\]](#ref11). These efforts are important, but we find that they are still limited in ways that matter for general instruction following. Some rely on simplified scenes and relatively narrow task distributions. Others generate trajectories by composing pre-defined skills, which makes the data easier to produce but restricts the complexity and flexibility of the resulting behaviors. Most importantly, the trained models still struggle with instruction diversity and robustness. For example, MolmoBot reports that its model can be sensitive to small linguistic changes such as the presence or absence of the word "the" in the instruction.

RoboCraft is designed to push beyond these limitations. Compared with prior simulation-data pipelines, RoboCraft emphasizes:

- **More realistic, cluttered, and diverse scene generation**, including a real-to-sim agentic pipeline for constructing richer tabletop environments.
- **More expressive reward primitives**, which are crucial for filtering complex task trajectories and for supporting future reinforcement-learning-style training.
- **More flexible trajectory generation**, where motion-planning code is produced through iterative agent-simulation refinement rather than only composing a fixed set of predefined skills.
- **Large-scale domain randomization**, covering object poses, camera viewpoints, lighting, backgrounds, textures, robot initial states, and controller dynamics.

We have trained our model on a subset of the generated data, and early results show promising robustness to perturbations and stronger general instruction following.

RoboCraft is built around two simple principles:

1. **Scaling diverse manipulation data is key to VLA generalization.** A robot cannot learn open-ended instruction following from a narrow set of tasks, scenes, and phrasings.
2. **Simulation makes this scaling cheaper, faster, and more controllable than the real world.** In simulation, we can automatically generate scenes, tasks, rewards, programs, and successful trajectories at a scale that would be extremely expensive to collect manually.

## Scaling diverse instruction following data in simulation

For language and vision models, web-scale data has been one of the major drivers of progress. For robot manipulation, however, data is much harder to scale.

RoboCraft attacks this bottleneck by turning robot data generation into an automated, verifiable simulation pipeline. RoboCraft automatically constructs scenes, generates tasks, writes reward code, synthesizes executable motion-planning programs, and rolls out successful trajectories. Each stage produces an artifact that makes the next stage more reliable.

At a high level, RoboCraft consists of five stages:

1. **Scene generation**: create diverse and realistic environments in simulation.
2. **Task generation**: synthesize feasible manipulation instructions.
3. **Reward code generation**: turn task goals into executable success checks.
4. **Motion-planning code generation**: use an agentic loop to write and debug motion-planning code.
5. **Trajectory generation**: roll out successful trajectories under domain randomization.

## Scene Generation — Building Diverse Robot Manipulation Worlds

Robust robot policies need to see more than clean tabletop scenes. They need clutter, different object combinations, realistic spatial relationships, visual variation, and physical diversity.

RoboCraft generates scenes through two complementary modes.

The first mode is **random synthesis**, which gives broad combinatorial coverage. RoboCraft samples everyday objects from a multi-source asset pool, converts them into simulation-ready assets, rescales them to realistic physical sizes, and places them into physics-valid tabletop layouts.

The second mode is **image-conditioned agentic generation**, which helps create more realistic and semantically structured scenes. Given a reference image, RoboCraft reconstructs a corresponding simulation scene with object and spatial manifests, enabling natural arrangements such as kitchen-style tabletops or scenes with realistic object co-occurrence.

Across both modes, RoboCraft further randomizes object poses, camera views, robot states, textures, backgrounds, lighting, and physics parameters. The result is not one perfect simulated world, but a broad distribution of physically plausible worlds for VLA training.

## Task Generation — Scaling Semantic Diversity

Once a scene is generated, RoboCraft proposes tasks conditioned on the objects and layout in that scene.

For each scene, we extract an object-segmented image and a scene graph describing inter-object spatial relationships. An LLM then proposes feasible manipulation instructions under the current robot setup.

We organize tasks into three difficulty levels:

**Easy** tasks are atomic and unambiguous, such as:

- "Put the mug on the coaster."
- "Move the book to the left."

**Medium** tasks require more precise spatial or geometric control, such as:

- "Place the cups in a row with handles facing right."
- "Stack the boxes from largest to smallest."

**Hard** tasks require reasoning over the scene. They may involve physical reasoning, semantic grouping, or visual attributes, such as:

- "Pick up the pen behind the book."
- "Put the condiments together."
- "Move the red fruit to the plate."

This lets RoboCraft scale beyond fixed task templates. The generated tasks are scene-conditioned, diverse, and designed to exercise both low-level manipulation and high-level instruction following.

## Reward Code Generation — Turning Language Goals into Executable Success Checks

A trajectory is only useful if we know whether it succeeded.

For simple tasks, success can be checked directly: "put the mug on the plate" means the mug should end up on the plate. But for compositional tasks, success may depend on semantic groups and spatial relations. For example, "separate the produce from the packaged drinks" requires understanding which objects are produce, which are drinks, and whether the two groups are spatially separated.

RoboCraft turns these language goals into executable reward code.

The reward-generation module receives the task instruction, scene-specific object identities, and a library of predicates such as `In`, `On`, `LeftTo`, and `RightTo`. A VLM then writes an `evaluate()` function that composes these predicates into a task-specific success checker.

This reward code is used in two places:

1. during motion-code generation, to decide whether the generated program solves the task;
2. during trajectory rollout, to filter successful trajectories from failed ones.

This is a core design choice in RoboCraft: language goals become executable verification programs.

## Motion-Planning Code Generation — Closed-loop coding through Agent-Simulation Interface

The hardest part of generating trajectories is to decide **what sequence of target poses** the robot should move through to complete a task, i.e. the motion-planning code.

For many tasks, this is difficult to generate in one shot. The model may not know whether a target pose is reachable, whether a path will collide, whether the object will move as expected, or whether the final state will satisfy the task.

RoboCraft solves this with an **Agent-Simulation Interface**.

The agent writes motion-planning code using low-level robot APIs such as:

- `move_to`
- `open_gripper`
- `close_gripper`
- `move_linear`
- `move_planar`

These APIs are lower-level than predefined skills. This makes generation harder, but also much more flexible: any task that can be described as a sequence of target poses and motion-planning calls can potentially be supported.

After the agent writes code, the simulator executes it and returns feedback through the interface. The feedback includes planning failure reasons, joint-limit and collision information, predicate-level reward results, object and robot states, multi-view observations, local object frames, and visualized target poses.

The agent then revises its code based on this feedback. The loop continues until the generated reward code reports success or the maximum number of refinement rounds is reached.

A generated program example for task "Place the 7 Up can into the left bottom drawer of the mini cabinet and close the drawer":

```python
def solve(self, seed: int = 42, skills=None) -> bool:
    """Solve the task with motion planning. Returns True when complete."""
    if skills is None:
        skills = SkillLibrary(self, self.planner)

    device = self.device
    num_envs = self.num_envs
    cabinet_name = "mini_2x2_top_open_bottom_drawer_0"
    can_name = "seven_up_can_0"
    drawer_handle_kp = "drawer_0_1_handle"
    drawer_body_kp = "drawer_0_1"

    rng = torch.Generator(device="cpu")
    rng.manual_seed(seed)
    skills.open_gripper()

    # 1) Open the drawer by pulling the handle toward the robot side (+Y).
    handle_grasp = skills.select_grasp_poses(
        cabinet_name,
        keypoint_name=drawer_handle_kp,
        approaching=[0.0, 1.0, 0.0],
        closing=[1.0, 0.0, 0.0],
    )
    skills.move_to(handle_grasp)
    skills.close_gripper()

    ee_pose = self.get_ee_pose()
    open_pos = ee_pose.position.clone()
    open_pos[:, 1] += 0.16
    open_pose = Pose(position=open_pos, quaternion=ee_pose.quaternion)
    skills.move_planar(
        open_pose,
        plane_normal=torch.tensor([0.0, 0.0, 1.0], device=device),
        hold_orientation=True,
        contact=True,
        object_names_to_disable_collision=[cabinet_name],
        attached_object_name=cabinet_name,
        source_call="open left bottom drawer",
    )
    skills.open_gripper()

    # 2) Pick the can from above.
    can_grasp = skills.select_grasp_poses(can_name, approaching="top")
    skills.move_to(can_grasp)
    skills.close_gripper()

    # 3) Move the can over the opened drawer cavity and release it inside.
    drawer_min, drawer_max = self.get_object_bounding_box_batch(
        cabinet_name,
        keypoint_name=drawer_body_kp,
    )
    can_min, can_max = self.get_object_bounding_box_batch(can_name)
    can_height = can_max[:, 2] - can_min[:, 2]
    target_pos = 0.5 * (drawer_min + drawer_max)
    target_pos[:, 1] -= 0.03
    target_pos[:, 2] = drawer_max[:, 2] + 0.5 * can_height + 0.04

    xy_jitter = (
        torch.rand((num_envs, 2), generator=rng) * 2.0 - 1.0
    ) * 0.005
    target_pos[:, :2] += xy_jitter.to(device=device, dtype=target_pos.dtype)
    target_pose = Pose(
        position=target_pos,
        quaternion=self.get_object_pose_batch(can_name).quaternion,
    )
    skills.move_to(
        target_pose,
        move_object=True,
        attached_object_name=can_name,
        source_call="move 7 Up can above opened left bottom drawer",
    )
    skills.open_gripper()

    # 4) Re-grasp the handle and push the drawer closed.
    handle_grasp = skills.select_grasp_poses(
        cabinet_name,
        keypoint_name=drawer_handle_kp,
        approaching=[0.0, 1.0, 0.0],
        closing=[1.0, 0.0, 0.0],
    )
    skills.move_to(handle_grasp)
    skills.close_gripper()

    ee_pose = self.get_ee_pose()
    close_pos = ee_pose.position.clone()
    close_pos[:, 1] -= 0.16
    close_pose = Pose(position=close_pos, quaternion=ee_pose.quaternion)
    skills.move_planar(
        close_pose,
        plane_normal=torch.tensor([0.0, 0.0, 1.0], device=device),
        hold_orientation=True,
        contact=True,
        object_names_to_disable_collision=[cabinet_name, can_name],
        attached_object_name=cabinet_name,
        source_call="close left bottom drawer",
    )
    skills.open_gripper()
    return True
```

This closed-loop design bridges the gap between flexible code generation and physical feasibility. The agent does not need to be perfect on the first try; it can use simulation feedback to debug its own robot program.

In short, RoboCraft does not only generate trajectories. It generates executable robot strategies and improves them in simulation.

## Trajectory Generation — From Programs to VLA Data

Once a motion-planning program succeeds, RoboCraft uses it to generate concrete trajectories.

The same program can be rolled out across many randomized variants of a task and scene. During rollout, RoboCraft randomizes object initial poses, camera poses, lighting, backgrounds, table textures, robot initial states, and controller dynamics such as stiffness and damping.

Each rollout is evaluated by the generated `evaluate()` function. Only successful trajectories are retained.

Figure 2. Example trajectories generated by RoboCraft. Each rollout is produced by executing generated motion-planning code and filtering the result with task-specific reward code. This final stage converts successful robot programs into VLA supervision: language instructions, visual observations, robot actions, and verified task outcomes.

Using RoboCraft, we generate over **1M successful trajectories** across diverse tasks and randomized environments. We have also trained a VLA model on part of the generated data. Early results show promising robustness to perturbations, stronger compositional generalization to new instructions, and encouraging zero-shot transfer to real robots. We will report detailed results in a future release.

Stay tuned!

## RoboCraft Is an Early Step

RoboCraft is our first release of a scalable simulation data generation pipeline for robot manipulation. It already enables large-scale VLA supervision, but there are several directions we are actively improving.

First, the current pipeline is tested on a single-arm robot. Since the pipeline is built around scene generation, reward code, motion-planning APIs, and simulator feedback, it is naturally extensible to more embodiments. We are working toward supporting dual-arm robots next.

Second, RoboCraft may also provide a path toward reinforcement learning for VLA models. Because every task comes with generated reward code, the same infrastructure used for trajectory filtering can potentially be used to provide training signals during policy optimization. We are excited to explore this direction further.

Third, RoboCraft currently focuses on rigid-object manipulation. Soft objects and liquids remain challenging due to simulation limitations, but they are important for many real-world tasks. Extending scalable data generation to these settings is an exciting direction for future work.

Beyond these extensions, we are especially interested in how synthetic simulation data should be combined with other data sources, including teleoperation data, UMI-style data, and human videos. Simulation gives us scale, control, and verifiability; real-world data gives us realism and embodiment grounding. Understanding the right mixture is one of the key open questions for building more general robot policies.

RoboCraft is not the final answer to robot data scaling. It is a step toward a more automated, verifiable, and controllable way to build embodied training data.

Our broader goal is to make robot data generation more scalable and scientific. We hope RoboCraft helps us and the community study how large-scale synthetic interaction data can improve VLA models, especially when real robot data is expensive, scarce, or hard to diversify.

Thanks for getting this far.

## References

<a id="ref1"></a>[1] Chi, C., Xu, Z., Pan, C., Cousineau, E., Burchfiel, B., Feng, S., Tedrake, R., & Song, S. Universal Manipulation Interface: In-The-Wild Robot Teaching Without In-The-Wild Robots. arXiv:2402.10329, 2024.

<a id="ref2"></a>[2] Ye, S., Jang, J., Jeon, B., Joo, S., Yang, J., Peng, B., Mandlekar, A., Tan, R., Lin, Y., & others. Latent Action Pretraining from Videos. arXiv:2410.11758, 2024.

<a id="ref3"></a>[3] Brohan, A., Brown, N., Carbajal, J., Chebotar, Y., Chen, X., Choromanski, K., Ding, T., Driess, D., Dubey, A., Finn, C., & others. RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control. arXiv:2307.15818, 2023.

<a id="ref4"></a>[4] Black, K., Brown, N., Driess, D., Esmail, A., Equi, M., Finn, C., Fusai, N., Groom, L., Hausman, K., Ichter, B., & others. pi_0: A Vision-Language-Action Flow Model for General Robot Control. arXiv:2410.24164, 2024.

<a id="ref5"></a>[5] Physical Intelligence Team. pi_0.7: A Steerable Generalist Robotic Foundation Model with Emergent Capabilities. arXiv:2604.15483, 2026.

<a id="ref6"></a>[6] Fang, Y., Feng, Y., Jing, D., Liu, J., Yang, Y., Wei, Z., Szafir, D., & Ding, M. When Vision Overrides Language: Evaluating and Mitigating Counterfactual Failures in VLAs. arXiv:2602.17659, 2026.

<a id="ref7"></a>[7] Katara, P., Xian, Z., & Fragkiadaki, K. Gen2Sim: Scaling up Robot Learning in Simulation with Generative Models. arXiv:2310.18308, 2023.

<a id="ref8"></a>[8] Hua, P., Liu, M., Macaluso, A., Lin, Y., Zhang, W., Xu, H., & Wang, L. GenSim2: Scaling Robot Data Generation with Multi-modal and Reasoning LLMs. arXiv:2410.03645, 2024.

<a id="ref9"></a>[9] Chen, T., Chen, Z., Chen, B., Cai, Z., Liu, Y., Li, Z., Liang, Q., Lin, X., Ge, Y., Gu, Z., & others. RoboTwin 2.0: A Scalable Data Generator and Benchmark with Strong Domain Randomization for Robust Bimanual Robotic Manipulation. arXiv:2506.18088, 2025.

<a id="ref10"></a>[10] Tian, Y., Yang, Y., Xie, Y., Cai, Z., Shi, X., Gao, N., Liu, H., Jiang, X., Qiu, Z., Yuan, F., & others. InternData-A1: Pioneering High-Fidelity Synthetic Data for Pre-training Generalist Policy. arXiv:2511.16651, 2025.

<a id="ref11"></a>[11] Deshpande, A., et al. MolmoB0T: Large-Scale Simulation Enables Zero-Shot Manipulation. arXiv:2603.16861, 2026.

<a id="ref12"></a>[12] Luo, H., Feng, Y., Zhang, W., Zheng, S., Wang, Y., Yuan, H., Liu, J., Xu, C., Jin, Q., & Lu, Z. Being-H0: Vision-Language-Action Pretraining from Large-Scale Human Videos. arXiv:2507.15597, 2025.

<a id="ref13"></a>[13] Dai, W., Lan, K., Zhou, J., Zhao, B., Su, X., Tong, J., Guan, W., & Yang, S. ConLA: Contrastive Latent Action Learning from Human Videos for Robotic Manipulation. arXiv:2602.00557, 2026.

<a id="ref14"></a>[14] Generalist AI. GEN-0 / Embodied Foundation Models That Scale with Physical Interaction. Generalist AI Blog, 2025. https://generalistai.com/blog/nov-04-2025-GEN-0

<a id="ref15"></a>[15] Generalist AI. GEN-1: Scaling Embodied Foundation Models to Mastery. Generalist AI Blog, 2026. https://generalistai.com/blog/apr-02-2026-GEN-1

## Citation

If you think this blog post and the content involved are helpful to you, please cite:

```bibtex
@article{robocraft,
  title = {Introducing RoboCraft: Scalable Robot Manipulation Data Generation in Simulation},
  author = {XLANG Lab VLA Team},
  journal = {xlang.ai},
  year = {2026},
  month = {May},
  url = "https://xlang.ai/blog/robocraft"
}
```
