---
title: 'RoboInF: Scaling Robot Manipulation Data in Simulation for General Instruction Following'
shortTitle: RoboInF
slug: roboinf
date: '2026-05-27T12:00:00Z'
author: XLANG Lab
coverImage: /blog/xgen/roboinf_cover.webp
previewContent: "RoboInF generates robot manipulation data at scale in simulation -- realistic scenes, natural instructions, and extreme trajectory diversity across objects, actions, and environments."
onlineImage: https://xlang.ai/blog/xgen/og-robocraft.png
githubLink: https://github.com/xlang-ai
layout: roboinf
---

## Why RoboInF

If you are training a vision-language-action model today, your data options are limited. Real robot teleoperation produces high-quality trajectories but scales slowly and covers narrow task distributions. Internet videos are abundant but lack ground-truth actions, and bridging the embodiment gap remains an open problem [\[1\]](#ref1)[\[2\]](#ref2)[\[3\]](#ref3)[\[4\]](#ref4). The result is a practical bottleneck: generalist manipulation policies need data that is **simultaneously diverse in scenes, natural in language, spatially precise, and physically varied** -- and most existing pipelines deliver only one or two of those properties at a time.

Modern VLA models have shown increasingly impressive long-horizon behavior, from household tasks to cooking-style demonstrations [\[5\]](#ref5)[\[6\]](#ref6). Those demonstrations make the data problem more urgent, not less. Generalist manipulation needs training data that covers richer scenes, natural language variation, fine-grained spatial control, and perturbations that do not appear in narrow benchmark distributions.

Recent systems such as GenSim2, RoboTwin, InternData-A1, and MolmoBot show that scalable robot data is becoming a central path toward general-purpose manipulation [\[7\]](#ref7)[\[8\]](#ref8)[\[9\]](#ref9)[\[10\]](#ref10). RoboInF addresses this by coupling five generation stages into a single pipeline: scene construction, task proposal, reward synthesis, motion-code generation with simulator feedback, and domain-randomized rollout with automatic success filtering. Every retained trajectory has been verified against a generated reward function before it enters the training set.

## Scene Generation - Building Diverse Robot Manipulation Worlds

**What this stage solves.** Robust policies need more than clean tabletop scenes. They need clutter, realistic object co-occurrence, spatial variation, camera changes, lighting changes, and physical diversity.

**How it works.** RoboInF uses two complementary scene-generation modes. Random synthesis provides broad combinatorial coverage by sampling everyday objects, converting them into simulation-ready assets, rescaling them to plausible physical sizes, and placing them in physics-valid tabletop layouts. Image-conditioned agentic generation helps reconstruct more natural arrangements from reference images, including object and spatial manifests for kitchen-style or household-style scenes.

Across both modes, RoboInF randomizes object poses, camera views, robot initial states, textures, backgrounds, lighting, and physics parameters. The intended distribution is not one perfect simulated world, but many plausible worlds that expose policies to natural visual and physical variation.

## Task Generation - Generating Scene-Conditioned Instructions

**What this stage solves.** A dataset can be large and still be narrow if every instruction comes from a fixed template. RoboInF aims for natural task diversity grounded in the actual objects and layout of each scene.

**How it works.** For each scene, RoboInF extracts object information and spatial relationships, then asks an LLM to propose feasible instructions under the current robot setup. The task distribution spans atomic object moves, precise spatial arrangements, semantic grouping, visual attributes, and simple physical reasoning.

Representative tasks include:

- "Put the mug on the coaster."
- "Place the cups in a row with handles facing right."
- "Pick up the pen behind the book."
- "Put the condiments together."
- "Move the red fruit to the plate."

This gives RoboInF fine-grained control over language, scene semantics, and task difficulty while still producing instructions that feel closer to natural manipulation goals than benchmark-only labels.

## Reward Code Generation - Turning Language into Executable Checks

**What this stage solves.** A trajectory is only useful if we know whether it solved the task. For compositional instructions, success may depend on spatial relations, semantic groups, object state, contact, orientation, or temporal constraints.

**How it works.** The reward-generation module receives the task instruction, scene-specific object identities, and a predicate library. A VLM then writes an `evaluate()` function that composes predicates such as `On`, `LeftTo`, `RightTo`, `IsInside`, `IsStatic`, `Upright`, `IsOpen`, and `ConstraintAlways` into a task-specific success checker.

Compact reward logic often looks like this:

```python
positions_swapped = book_at_target & mug_at_target
both_settled = book_settled & mug_settled
success = positions_swapped & both_settled & book_always_upright
```

The predicate library covers many common manipulation success criteria and can be extended as tasks become more complex. Current categories include spatial relations, orientation, contact, articulation state, temporal constraints, and neural/image predicates.

**Where it is used.** Reward code is used during motion-code generation to decide whether a generated program solves the task, and again during trajectory rollout to filter successful trajectories from failed ones. This is the verification layer that lets RoboInF scale data without treating every rollout as useful by default.

The full-code exhibit below shows a generated temporal reward for a two-stage task: place a knife inside a red box, then move the box onto a cutting board while keeping the knife inside.

## Motion-Planning Code Generation - Debugging Robot Programs in Simulation

**What this stage solves.** The difficult part of trajectory generation is deciding the sequence of poses, grasps, and contact motions needed to complete a task. A generated plan may be unreachable, collide with the scene, drop the object, or finish in a state that does not satisfy the reward.

**How it works.** RoboInF uses an Agent-Simulation Interface. The agent writes motion-planning code with low-level APIs such as `move_to`, `open_gripper`, `close_gripper`, `move_linear`, and `move_planar`. The simulator executes the code and returns feedback: planning failures, collision and joint-limit information, predicate-level reward results, object and robot states, multi-view observations, local object frames, and visualized target poses.

The agent then revises the program. The loop continues until the generated reward code reports success or the maximum refinement budget is reached.

For a task such as "Place the 7 Up can into the left bottom drawer of the mini cabinet and close the drawer," the generated strategy can be summarized as:

1. Open the drawer by grasping and pulling the handle.
2. Pick the can from above.
3. Move the can over the open drawer cavity and release it.
4. Re-grasp the drawer handle.
5. Push the drawer closed.
6. Verify success with the generated reward code.

This stage is important because RoboInF is not only composing fixed skills. It generates executable robot strategies and improves them with physical feedback.

## Trajectory Generation - Filtering Rollouts into VLA Supervision

**What this stage solves.** A successful generated program can be reused across many randomized variants of the task and scene. This turns one solved strategy into many supervised trajectories.

**How it works.** During rollout, RoboInF randomizes object initial poses, camera poses, lighting, backgrounds, table textures, robot initial states, and controller dynamics such as stiffness and damping. Each rollout is evaluated by the generated `evaluate()` function, and only successful trajectories are retained for the main dataset.

The retained data records include the natural-language instruction, observations, robot actions, end-effector poses, phase labels, success flags, predicate-level results, and optional videos. This final stage converts executable robot programs into filtered VLA training data.

Using RoboInF, we target over **1M successful trajectories** across diverse tasks and randomized environments.

## Early model observations

We have begun training VLA models on a subset of the generated data. We are not reporting quantitative results in this preview because we want the first published numbers to come with a reproducible benchmark and ablation study rather than preliminary snapshots.

Qualitatively, models trained with RoboInF data **handle perturbations** (distractor objects, changed lighting, shifted camera poses) **more reliably** than our internal baselines, and they follow **compositional instructions more consistently**. We have also seen early signs of **zero-shot sim-to-real transfer**, which we are working to characterize rigorously.

For this preview, the main contribution is the data engine itself: a way to automatically generate diverse, realistic, controllable, and verifiable manipulation experience at scale. RoboInF is our first step toward scalable robot data generation that is both broad and inspectable, and we are continuing to expand the pipeline across embodiments, richer physical settings, and stronger mixtures of synthetic and real-world data.

Full results, training recipes, and benchmark details will accompany the data and code release.

## References

<a id="ref1"></a>[1] Chi, C., Xu, Z., Pan, C., Cousineau, E., Burchfiel, B., Feng, S., Tedrake, R., & Song, S. Universal Manipulation Interface: In-The-Wild Robot Teaching Without In-The-Wild Robots. arXiv:2402.10329, 2024.

<a id="ref2"></a>[2] Ye, S., Jang, J., Jeon, B., Joo, S., Yang, J., Peng, B., Mandlekar, A., Tan, R., Lin, Y., & others. Latent Action Pretraining from Videos. arXiv:2410.11758, 2024.

<a id="ref3"></a>[3] Luo, H., Feng, Y., Zhang, W., Zheng, S., Wang, Y., Yuan, H., Liu, J., Xu, C., Jin, Q., & Lu, Z. Being-H0: Vision-Language-Action Pretraining from Large-Scale Human Videos. arXiv:2507.15597, 2025.

<a id="ref4"></a>[4] Dai, W., Lan, K., Zhou, J., Zhao, B., Su, X., Tong, J., Guan, W., & Yang, S. ConLA: Contrastive Latent Action Learning from Human Videos for Robotic Manipulation. arXiv:2602.00557, 2026.

<a id="ref5"></a>[5] Physical Intelligence Team. pi_0.7: A Steerable Generalist Robotic Foundation Model with Emergent Capabilities. arXiv:2604.15483, 2026.

<a id="ref6"></a>[6] Generalist AI. GEN-1: Scaling Embodied Foundation Models to Mastery. Generalist AI Blog, 2026. https://generalistai.com/blog/apr-02-2026-GEN-1

<a id="ref7"></a>[7] Hua, P., Liu, M., Macaluso, A., Lin, Y., Zhang, W., Xu, H., & Wang, L. GenSim2: Scaling Robot Data Generation with Multi-modal and Reasoning LLMs. arXiv:2410.03645, 2024.

<a id="ref8"></a>[8] Chen, T., Chen, Z., Chen, B., Cai, Z., Liu, Y., Li, Z., Liang, Q., Lin, X., Ge, Y., Gu, Z., & others. RoboTwin 2.0: A Scalable Data Generator and Benchmark with Strong Domain Randomization for Robust Bimanual Robotic Manipulation. arXiv:2506.18088, 2025.

<a id="ref9"></a>[9] Tian, Y., Yang, Y., Xie, Y., Cai, Z., Shi, X., Gao, N., Liu, H., Jiang, X., Qiu, Z., Yuan, F., & others. InternData-A1: Pioneering High-Fidelity Synthetic Data for Pre-training Generalist Policy. arXiv:2511.16651, 2025.

<a id="ref10"></a>[10] Deshpande, A., et al. MolmoB0T: Large-Scale Simulation Enables Zero-Shot Manipulation. arXiv:2603.16861, 2026.

<a id="ref11"></a>[11] Brohan, A., Brown, N., Carbajal, J., Chebotar, Y., Chen, X., Choromanski, K., Ding, T., Driess, D., Dubey, A., Finn, C., & others. RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control. arXiv:2307.15818, 2023.

<a id="ref12"></a>[12] Black, K., Brown, N., Driess, D., Esmail, A., Equi, M., Finn, C., Fusai, N., Groom, L., Hausman, K., Ichter, B., & others. pi_0: A Vision-Language-Action Flow Model for General Robot Control. arXiv:2410.24164, 2024.

<a id="ref13"></a>[13] Fang, Y., Feng, Y., Jing, D., Liu, J., Yang, Y., Wei, Z., Szafir, D., & Ding, M. When Vision Overrides Language: Evaluating and Mitigating Counterfactual Failures in VLAs. arXiv:2602.17659, 2026.

<a id="ref14"></a>[14] Katara, P., Xian, Z., & Fragkiadaki, K. Gen2Sim: Scaling up Robot Learning in Simulation with Generative Models. arXiv:2310.18308, 2023.

<a id="ref15"></a>[15] Generalist AI. GEN-0 / Embodied Foundation Models That Scale with Physical Interaction. Generalist AI Blog, 2025. https://generalistai.com/blog/nov-04-2025-GEN-0

## Citation

If you think this blog post and the content involved are helpful to you, please cite:

```bibtex
@article{roboinf,
  title = {RoboInF: Scaling Robot Manipulation Data in Simulation for General Instruction Following},
  author = {XLANG Lab},
  journal = {xlang.ai},
  year = {2026},
  month = {May},
  url = "https://xlang.ai/blog/roboinf"
}
```
