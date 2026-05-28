import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import { getAllPosts, getPostBySlug } from '@/utils/post';
import { parseDateString } from '@/utils/date';
import { publicFilePath } from '@/utils';

import { BlogPost as Post } from '@/interface/blog';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
const rehypeHighlightPlugin = rehypeHighlight as any;
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
hljs.registerLanguage('python', python);
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';

const BlogPost = ({ post }: { post: Post }) => {
  if (post.layout === 'roboinf') {
    return <RoboCraftPost post={post} />;
  }

  const BlogUrl = `https://xlang.ai/blog/${post.slug}`;
  // const TwitterShareUrl = `http://www.twitter.com/share?url=${BlogUrl}&text=${post.title}`;
  const TwitterShareUrl = post.twitterLink || 'https://twitter.com/XLangNLP';
  const GithubShareUrl = post.githubLink || 'https://github.com/xlang-ai';
  return (
    <>
      <Head>
        <title>{`XLANG Lab | ${post.title}`}</title>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/black-on-white/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/black-on-white/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/black-on-white/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/black-on-white/site.webmanifest' />
        <meta name="description" content={post.title} />  
        <meta property="og:title" content={post.title} />  
        <meta property="og:type" content="website" />  
        <meta property="og:image" content={post.onlineImage} />  
        <meta property="og:description" content={post.previewContent} />  
        <meta property="og:url" content={BlogUrl} />  
        <meta name="twitter:card" content="summary_large_image" />  
        <meta name="twitter:title" content={post.title} />  
        <meta name="twitter:description" content={post.previewContent} />  
        <meta name="twitter:image" content={post.onlineImage} />
      </Head>
      <div className='pt-36 w-full min-h-screen bg-[#D9D9D9]/20'>
        <div className='page-x-width'>
          <div className='flex flex-col gap-8 mb-8'>
            <div className='text-xs text-[#545454] font-[500] tracking-widest'>
              <Link href='/blog'>Blog</Link> / {post.shortTitle || post.title}
            </div>

            <div className='text-[#0156AC] font-[500] text-3xl text-justify'>
              {post.title}
            </div>
            {post.subTitle && <div className='text-[#0156AC] font-[500] text-2xl text-justify'>
              {post.subTitle}
            </div>}

            <div className='flex flex-wrap flex-col w-full'>
              <PostMeta date={post.date} author={post.author} twitterUrl={TwitterShareUrl} githubUrl={GithubShareUrl}/>
              <PostImage coverImage={post.coverImage} title={post.title} />
              {post.title == 'Introducing Lemur: The State-of-the-art Open Pretrained Large Language Models Balancing Text and Code Capabilities' && <div className='flex items-center justify-center mt-2'>
                <div className='max-sm:text-sm border border-brand-primary2 border-2 text-brand-primary2 font-[500] rounded-xl py-1 px-3 cursor-pointer w-52 text-center'>
                  <a href="https://huggingface.co/OpenLemur" target="_blank" rel="noopener noreferrer">
                    Download the Models
                  </a>
                </div>
              </div>}
            </div>
          </div>

          <ReactMarkdown
            className='tracking-wide leading-7 mb-24 mt-6'
            rehypePlugins={[rehypeRaw, rehypeHighlightPlugin]} linkTarget="_blank"
            components={{
              h2(props) {
                return (
                  <h2 className='text-xl font-[600] my-6 text-justify'>{props.children}</h2>
                );
              },
              h3(props) {
                return (
                  <h3 className='text-lg font-[600] my-6 text-justify'>{props.children}</h3>
                );
              },
              p(props) {
                return (
                  <p className='mb-4 text-sm leading-7 text-justify'>{props.children}</p>
                );
              },
              ul(props) {
                return <ul className='list-disc pl-4 text-sm leading-7 text-justify'>{props.children}</ul>;
              },
              a(props) {
                // Check if the link is a reference citation (matches #ref pattern)
                const isRefCitation = props.href && props.href.match(/^#ref\d+$/);
                
                if (isRefCitation) {
                  // Render reference citations as plain text without links
                  return (
                    <span className='text-sm font-medium text-blue-600 bg-blue-50 px-1 py-0.5 rounded'>
                      {props.children}
                    </span>
                  );
                }
                
                // Handle all other links normally
                return (
                  <a 
                    href={props.href} 
                    target="_blank" 
                    className='underline cursor-pointer hover:text-brand-primary2 text-justify'
                  >
                    {props.children}
                  </a>
                );
              },
              iframe(props) {
                return (
                  <iframe
                    {...props}
                    className="w-full aspect-video"
                  />
                );
              },
              hr(props) {
                return <hr className='my-6' />;
              },
              code(props) {
                // Handle inline code
                if (!props.className) {
                  return (
                    <code className='bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono'>
                      {props.children}
                    </code>
                  );
                }
                // Handle code blocks
                return (
                  <code className='block bg-gray-100 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed'>
                    {props.children}
                  </code>
                );
              },
              pre(props) {
                return (
                  <pre className='bg-gray-100 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto my-4 leading-relaxed'>
                    {props.children}
                  </pre>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
};

type Reference = {
  id: string;
  number: string;
  text: string;
};

type ParsedRobocraftContent = {
  preStageContent: string;
  postStageContent: string;
  citationContent: string;
  references: Reference[];
  stages: RoboCraftStage[];
};

type RoboCraftStage = {
  id: string;
  shortTitle: string;
  title: string;
  content: string;
  kicker: string;
  mediaKind: 'scene' | 'taskPlaceholder' | 'rewardPlaceholder' | 'motionPlaceholder' | 'trajectoryVideo' | 'none';
};

const ROBOCRAFT_STAGE_DEFS = [
  {
    prefix: 'Scene Generation',
    shortTitle: 'Scene Gen',
    kicker: 'Diverse worlds',
    mediaKind: 'scene' as const,
  },
  {
    prefix: 'Task Generation',
    shortTitle: 'Task Gen',
    kicker: 'Scene-conditioned goals',
    mediaKind: 'taskPlaceholder' as const,
  },
  {
    prefix: 'Reward Code Generation',
    shortTitle: 'Reward Gen',
    kicker: 'Language into checks',
    mediaKind: 'rewardPlaceholder' as const,
  },
  {
    prefix: 'Motion-Planning Code Generation',
    shortTitle: 'Motion Code',
    kicker: 'Agentic robot programs',
    mediaKind: 'motionPlaceholder' as const,
  },
  {
    prefix: 'Trajectory Generation',
    shortTitle: 'Traj Gen',
    kicker: 'Verified VLA rollouts',
    mediaKind: 'trajectoryVideo' as const,
  },
];

const ROBOCRAFT_METRICS = [
  {
    value: '1M+',
    label: 'successful trajectories',
    detail: 'Verified rollouts across diverse tasks and environments.',
    tone: 'border-[#0f766e]/30 bg-[#ecfdf5] text-[#0f766e]',
  },
  {
    value: '5K+',
    label: 'tasks',
    detail: 'Diverse ability distribution for tabletop manipulation learning.',
    tone: 'border-[#0156AC]/30 bg-[#edf4ff] text-[#0156AC]',
  },
  {
    value: '300+',
    label: 'scenes',
    detail: 'Randomized tabletop worlds with realistic clutter and variation.',
    tone: 'border-[#b45309]/30 bg-[#fff7ed] text-[#b45309]',
  },
  {
    value: '50+',
    label: 'reward primitives',
    detail: 'Compose for unlimited reward and evaluation logic.',
    tone: 'border-[#6C4AAF]/30 bg-[#f8f5ff] text-[#6C4AAF]',
  },
];

const PIPELINE_ARTIFACTS = [
  { label: 'Scene', artifact: 'randomized tabletop world' },
  { label: 'Task', artifact: 'scene-conditioned instruction' },
  { label: 'Reward', artifact: 'executable evaluate()' },
  { label: 'Program', artifact: 'motion-planning code' },
  { label: 'Rollout', artifact: 'successful trajectory' },
  { label: 'Output', artifact: 'VLA training record' },
];

const ROADMAP_ITEMS = [
  {
    today: 'Single-arm manipulation',
    next: 'Dual-arm and broader embodiments',
    why: 'More realistic household and industrial manipulation.',
  },
  {
    today: 'Rigid objects',
    next: 'Soft objects, liquids, and deformables',
    why: 'Clothes, food, packaging, and other everyday materials.',
  },
  {
    today: 'Reward-filtered SFT data',
    next: 'RL fine-tuning and multi-task co-training with the same rewards',
    why: 'Move from imitation to optimization without writing new reward functions.',
  },
  {
    today: 'Coarse-grained manipulation tasks',
    next: 'More intricate, fine-grained, and difficult task programs',
    why: 'Stress-test compositional rewards, contact-rich motion code, and long-horizon verification.',
  },
];

const REWARD_PREDICATE_CHIPS = [
  'Sequential',
  'ConstraintAlwaysAfter',
  'IsInside',
  'On',
  'PullBy',
  'Stage state',
];

const REWARD_CODE_EXCERPT = `sequential_success = self.sequential(self)
knife_stays_in_box = self.knife_stays_in_box(self)
success = sequential_success & knife_stays_in_box`;

const FULL_REWARD_CODE = `def __init__(self, cfg: ScaleTaskEnvCfg, **kwargs):
    super().__init__(cfg)
    from isaaclab.predicates import On, IsInside
    from isaaclab.predicates.temporal import Sequential, ConstraintAlwaysAfter
    from isaaclab.predicates.motion import PullBy

    self.knife_in_box = IsInside(cfg=None, env=self)
    self.box_on_board = On(cfg=None, env=self)
    self.pull_by = PullBy(cfg=None, env=self)

    self._stage1_predicate = lambda: self.knife_in_box(
        self, entity="kitchen_knife", container="red_plasticbox"
    )

    self._box_pulled_predicate = lambda: (
        self.pull_by(self, entity="red_plasticbox", by="panda_hand", target_distance=0.10, axis="auto")
        | self.pull_by(self, entity="red_plasticbox", by="panda_leftfinger", target_distance=0.10, axis="auto")
        | self.pull_by(self, entity="red_plasticbox", by="panda_rightfinger", target_distance=0.10, axis="auto")
    )

    self._stage2_predicate = lambda: (
        self.box_on_board(self, subject="red_plasticbox", support="cutting_board")
        & self.knife_in_box(self, entity="kitchen_knife", container="red_plasticbox")
        & self._box_pulled_predicate()
    )

    self.knife_stays_in_box = ConstraintAlwaysAfter(
        self,
        predicate_fn=lambda: self.knife_in_box(self, entity="kitchen_knife", container="red_plasticbox"),
        trigger_fn=self._stage1_predicate,
        constraint_id="knife_stays_in_box",
    )

    self.sequential = Sequential(self, self._stage1_predicate, self._stage2_predicate)

def evaluate(self) -> Dict[str, torch.Tensor]:
    sequential_success = self.sequential(self)
    knife_stays_in_box = self.knife_stays_in_box(self)

    knife_inside = self.knife_in_box(self, entity="kitchen_knife", container="red_plasticbox")
    box_on_cutting_board = self.box_on_board(self, subject="red_plasticbox", support="cutting_board")
    box_was_pulled = self._box_pulled_predicate()

    current_stage = self.sequential.get_current_stage(self)
    success = sequential_success & knife_stays_in_box

    return {
        "success": success,
        "sequential_success": sequential_success,
        "knife_stays_in_box": knife_stays_in_box,
        "knife_inside_box": knife_inside,
        "box_on_cutting_board": box_on_cutting_board,
        "box_was_pulled": box_was_pulled,
        "current_stage": current_stage.float(),
    }`;

const MOTION_PRIMITIVE_CHIPS = [
  'move_to',
  'open_gripper',
  'close_gripper',
  'move_planar',
  'select_grasp_poses',
];

const MOTION_CODE_EXCERPT = `# 1. Open the drawer
handle = skills.select_grasp_poses("cabinet", keypoint="handle")
skills.move_to(handle) → skills.close_gripper()
skills.move_planar(+Y, contact=True)       # pull open
skills.open_gripper()

# 2. Pick can and place into drawer
can_grasp = skills.select_grasp_poses("can", approach="top")
skills.move_to(can_grasp) → skills.close_gripper()
target = bbox_center(drawer) + height_offset
skills.move_to(target) → skills.open_gripper()  # release into drawer

# 3. Close the drawer
skills.move_to(handle) → skills.close_gripper()
skills.move_planar(-Y, contact=True)       # push closed
skills.open_gripper()`;

const FULL_MOTION_CODE = `def solve(self, seed: int = 42, skills=None) -> bool:
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
    return True`;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const getMarkdownText = (children: React.ReactNode): string => {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getMarkdownText).join('');
  }

  if (React.isValidElement(children)) {
    return getMarkdownText(children.props.children);
  }

  return '';
};

const parseReferences = (content: string): Reference[] => {
  const referenceStart = content.search(/^## References/m);
  if (referenceStart < 0) return [];

  const citationStart = content.search(/^## Citation/m);
  const referenceBlock = content.slice(
    referenceStart,
    citationStart > referenceStart ? citationStart : undefined
  );

  return referenceBlock
    .split('\n')
    .map((line) => line.trim())
    .map((line) =>
      line.match(/(?:<a id=["']ref(\d+)["']><\/a>)?\s*\\?\[(\d+)\\?\]\s*(.+)/)
    )
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => {
      const number = match[1] || match[2];
      return {
        id: `ref${number}`,
        number,
        text: match[3].replace(/\\\./g, '.').trim(),
      };
    });
};

const parseRobocraftContent = (content: string): ParsedRobocraftContent => {
  const referenceStart = content.search(/^## References/m);
  const citationStart = content.search(/^## Citation/m);
  const bodyEnd =
    referenceStart >= 0 ? referenceStart : citationStart >= 0 ? citationStart : content.length;
  const body = content.slice(0, bodyEnd).trim();
  const citationContent = citationStart >= 0 ? content.slice(citationStart).trim() : '';
  const references = parseReferences(content);

  const headings = Array.from(body.matchAll(/^## (.+)$/gm)).map((match, index, matches) => ({
    title: match[1].trim(),
    start: match.index || 0,
    bodyStart: (match.index || 0) + match[0].length,
    end: 0,
  }));

  headings.forEach((heading, index) => {
    heading.end = headings[index + 1]?.start ?? body.length;
  });

  const stageHeadings = headings
    .map((heading) => {
      const def = ROBOCRAFT_STAGE_DEFS.find((stage) => heading.title.startsWith(stage.prefix));
      return def ? { ...heading, def } : null;
    })
    .filter((heading): heading is NonNullable<typeof heading> => Boolean(heading));

  if (!stageHeadings.length) {
    return {
      preStageContent: body,
      postStageContent: '',
      citationContent,
      references,
      stages: [],
    };
  }

  const stages = stageHeadings.map(({ title, bodyStart, end, def }) => ({
    id: slugify(def.shortTitle),
    shortTitle: def.shortTitle,
    title,
    content: body.slice(bodyStart, end).trim(),
    kicker: def.kicker,
    mediaKind: def.mediaKind,
  }));

  return {
    preStageContent: body.slice(0, stageHeadings[0].start).trim(),
    postStageContent: body.slice(stageHeadings[stageHeadings.length - 1].end).trim(),
    citationContent,
    references,
    stages,
  };
};

const getContentHeadings = (content: string) =>
  Array.from(content.matchAll(/^## (.+)$/gm)).map((match) => {
    const title = match[1].trim();
    return {
      id: slugify(title),
      label: title.replace(/\s+—\s+.+$/, ''),
    };
  });

const splitPostStageContent = (content: string) => {
  const finalNoteMarker = /\n\n(?=RoboCraft is our first step)/.exec(content);
  if (!finalNoteMarker || finalNoteMarker.index === undefined) {
    return { before: content.trim(), finalNote: '' };
  }

  return {
    before: content.slice(0, finalNoteMarker.index).trim(),
    finalNote: content.slice(finalNoteMarker.index).trim(),
  };
};

const RoboCraftPost = ({ post }: { post: Post }) => {
  const parsed = useMemo(() => parseRobocraftContent(post.content), [post.content]);
  const postContentParts = useMemo(
    () => splitPostStageContent(parsed.postStageContent),
    [parsed.postStageContent]
  );
  const [activeStage, setActiveStage] = useState(0);
  const [activeCitation, setActiveCitation] = useState<string>();
  const [activeSection, setActiveSection] = useState('overview');

  const BlogUrl = `https://xlang.ai/blog/${post.slug}`;
  const TwitterShareUrl = post.twitterLink || 'https://twitter.com/XLangNLP';
  const GithubShareUrl = post.githubLink || 'https://github.com/xlang-ai';

  const toc = useMemo(
    () => [
      { id: 'overview', label: 'Overview' },
      ...getContentHeadings(parsed.preStageContent),
      { id: 'pipeline-module', label: 'Pipeline Explorer' },
      ...getContentHeadings(postContentParts.before),
      { id: 'roadmap', label: 'Current Scope' },
      ...(parsed.citationContent ? [{ id: 'citation', label: 'Citation' }] : []),
    ],
    [parsed.citationContent, parsed.preStageContent, postContentParts.before]
  );

  useEffect(() => {
    const ids = toc.map((item) => item.id);
    const onScroll = () => {
      const current = ids
        .map((id) => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top ?? 9999 }))
        .filter((item) => item.top < 180)
        .pop();
      if (current) setActiveSection(current.id);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [toc]);

  return (
    <>
      <BlogHead post={post} blogUrl={BlogUrl} />
      <div className='min-h-screen bg-[#fbfbf8] pt-28 text-[#0b1b2b]'>
        <div className='mx-auto grid w-full max-w-[1480px] grid-cols-1 gap-8 px-4 pb-24 xl:grid-cols-[190px_minmax(0,900px)_250px] 2xl:px-8'>
          <aside className='hidden xl:block'>
            <div className='sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto border-l border-slate-200/70 pl-5'>
              <Link href='/blog' className='mb-8 block text-xs font-semibold uppercase text-slate-500 hover:text-[#0f766e]'>
                Blog
              </Link>
              <div className='mb-3 text-[11px] font-semibold uppercase text-slate-500'>
                Contents
              </div>
              <nav className='flex flex-col gap-3'>
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-sm leading-5 transition-colors ${
                      activeSection === item.id
                        ? 'font-semibold text-[#0f766e]'
                        : 'text-slate-500 hover:text-[#0f766e]'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <main className='space-y-12'>
            <section id='overview' className='scroll-mt-28 pb-4'>
              <div className='mb-5 flex flex-wrap gap-2 text-xs font-semibold uppercase text-[#0f766e]'>
                <span>Preview release</span>
                <span>/</span>
                <span>{parseDateString(post.date)}</span>
              </div>
              <h1 className='max-w-4xl text-3xl font-semibold leading-tight text-[#031425] sm:text-5xl'>
                RoboInF: Scaling <u className='decoration-[#0f766e]'>Robo</u>t Manipulation Data in Simulation for General <u className='decoration-[#0f766e]'>In</u>struction <u className='decoration-[#0f766e]'>F</u>ollowing
              </h1>
              <p className='mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-700'>
                <span className='font-semibold text-[#031425]'>Diverse instruction-following data</span>{' '}
                for robot manipulation at scale: RoboInF automatically generates realistic scenes, natural task instructions, and verified trajectories across objects, actions, and environments.
              </p>
              <RoboCraftHeroMeta date={post.date} author={post.author} twitterUrl={TwitterShareUrl} githubUrl={GithubShareUrl} />
              <HeroProofPanel />
              <DemoCarousel />
            </section>

            <div className='border-y border-slate-200 py-5 xl:hidden'>
              <div className='mb-3 text-xs font-semibold uppercase text-slate-500'>
                Contents
              </div>
              <div className='flex flex-wrap gap-2'>
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className='rounded-full border border-[#0f766e]/20 px-3 py-1 text-xs font-semibold text-[#0f766e]'
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <article className='space-y-14'>
              <section>
                <RoboCraftMarkdown
                  content={parsed.preStageContent}
                  activeCitation={activeCitation}
                  setActiveCitation={setActiveCitation}
                />
              </section>
              <PipelineShowcase />
              <StageExplorer
                stages={parsed.stages}
                activeStage={activeStage}
                setActiveStage={setActiveStage}
                activeCitation={activeCitation}
                setActiveCitation={setActiveCitation}
              />
              {postContentParts.before && (
                <section className='border-t border-slate-200 pt-10'>
                  <RoboCraftMarkdown
                    content={postContentParts.before}
                    activeCitation={activeCitation}
                    setActiveCitation={setActiveCitation}
                  />
                </section>
              )}
              <RoadmapSection />
              {postContentParts.finalNote && (
                <section className='-mt-10'>
                  <RoboCraftMarkdown
                    content={postContentParts.finalNote}
                    activeCitation={activeCitation}
                    setActiveCitation={setActiveCitation}
                  />
                </section>
              )}
              {parsed.citationContent && (
                <section id='citation' className='border-t border-slate-200 pt-10'>
                  <RoboCraftMarkdown
                    content={parsed.citationContent}
                    activeCitation={activeCitation}
                    setActiveCitation={setActiveCitation}
                  />
                </section>
              )}
            </article>

            <section className='mt-8 border-t border-slate-200 pt-8 xl:hidden'>
              <h2 className='mb-4 text-lg font-semibold text-slate-500'>References</h2>
              <ReferencesList references={parsed.references} activeCitation={activeCitation} idSuffix='-mobile' />
            </section>
          </main>

          <aside className='hidden xl:block'>
            <ReferenceRail references={parsed.references} activeCitation={activeCitation} />
          </aside>
        </div>
      </div>
    </>
  );
};

const BlogHead = ({ post, blogUrl }: { post: Post; blogUrl: string }) => (
  <Head>
    <title>{`XLANG Lab | ${post.title}`}</title>
    <link
      rel='apple-touch-icon'
      sizes='180x180'
      href='/favicon/black-on-white/apple-touch-icon.png'
    />
    <link
      rel='icon'
      type='image/png'
      sizes='32x32'
      href='/favicon/black-on-white/favicon-32x32.png'
    />
    <link
      rel='icon'
      type='image/png'
      sizes='16x16'
      href='/favicon/black-on-white/favicon-16x16.png'
    />
    <link rel='manifest' href='/favicon/black-on-white/site.webmanifest' />
    <meta name="description" content={post.previewContent || post.title} />
    <meta property="og:title" content={post.title} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={post.onlineImage} />
    <meta property="og:description" content={post.previewContent} />
    <meta property="og:url" content={blogUrl} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={post.title} />
    <meta name="twitter:description" content={post.previewContent} />
    <meta name="twitter:image" content={post.onlineImage} />
  </Head>
);

const RoboCraftHeroMeta = ({
  date,
  author,
  twitterUrl,
  githubUrl,
}: {
  date: string;
  author: string;
  twitterUrl: string;
  githubUrl: string;
}) => (
  <div className='mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-500'>
    <span>
      <span className='font-semibold text-slate-700'>Author</span> {author}
    </span>
    <span>
      <span className='font-semibold text-slate-700'>Date</span> {parseDateString(date)}
    </span>
    <div className='flex items-center gap-3'>
      <span className='font-semibold text-slate-700'>Share</span>
      <PostShare twitterUrl={twitterUrl} githubUrl={githubUrl} />
    </div>
  </div>
);

const HeroProofPanel = () => (
  <section className='mt-10 border-y border-slate-200 py-7'>
    <div className='grid gap-y-6 sm:grid-cols-2 sm:gap-y-7 lg:grid-cols-4 lg:divide-x lg:divide-slate-200'>
      {ROBOCRAFT_METRICS.map((metric, index) => (
        <div
          key={metric.label}
          className={`lg:px-5 ${index === 0 ? 'lg:pl-0' : ''} ${
            index === ROBOCRAFT_METRICS.length - 1 ? 'lg:pr-0' : ''
          }`}
        >
          <div className='text-4xl font-semibold leading-none text-[#031425]'>{metric.value}</div>
          <div className='mt-2 text-xs font-semibold uppercase text-slate-500'>{metric.label}</div>
          <p className='mt-2 text-sm leading-6 text-slate-600'>{metric.detail}</p>
        </div>
      ))}
    </div>
  </section>
);

const PipelineShowcase = () => (
  <section className='border-t border-slate-200 pt-12'>
    <div className='mb-7'>
      <div className='text-xs font-semibold uppercase text-[#0f766e]'>
        Pipeline overview
      </div>
      <h2 className='mt-2 text-3xl font-semibold leading-tight text-[#031425]'>
        Five generation stages, one training-data output
      </h2>
      <p className='mt-3 max-w-3xl text-sm leading-7 text-slate-600'>
        Each stage produces an artifact that makes the next stage more reliable. The endpoint is not a finished model in this preview; it is filtered VLA supervision containing instructions, observations, actions, and task-success metadata.
      </p>
    </div>

    <ol className='grid border-y border-slate-200 md:grid-cols-6'>
      {PIPELINE_ARTIFACTS.map((item, index) => (
        <li
          key={item.label}
          className={`py-4 md:px-4 ${index > 0 ? 'md:border-l md:border-slate-200' : ''} ${
            item.label === 'Output' ? 'text-[#0f766e]' : 'text-[#031425]'
          }`}
        >
          <div className='text-[11px] font-semibold uppercase text-slate-400'>
            {index < 5 ? `0${index + 1}` : 'Output'}
          </div>
          <div className='mt-2 text-base font-semibold'>{item.label}</div>
          <div className='mt-1 text-sm leading-6 text-slate-600'>{item.artifact}</div>
        </li>
      ))}
    </ol>

    <div className='mt-8'>
      <div className='overflow-hidden rounded-xl'>
        <div className='relative aspect-[2/1] w-full'>
          <Image
            src={publicFilePath('/blog/xgen/pipeline_main.webp')}
            alt='Pipeline overview'
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        </div>
      </div>
    </div>
  </section>
);

const DEMO_SLIDES: { video: string; instruction: string; category: 'organized' | 'random' }[] = [
  { video: '/blog/xgen/demos/arrange_the_pink_and_blue_toy_cars_on_the_display_stand_so_they_are_back_to_back.mp4', instruction: 'Arrange the pink and blue toy cars on the display stand so they are back to back.', category: 'organized' },
  { video: '/blog/xgen/demos/random/mouse_otherside.mp4', instruction: 'Turn the mouse around so it faces the other way', category: 'random' },
  { video: '/blog/xgen/demos/hit_the_parts_stand_three_times_with_the_hammer.mp4', instruction: 'Hit the parts stand three times with the hammer.', category: 'organized' },
  { video: '/blog/xgen/demos/random/turn_bottle_upright.mp4', instruction: 'Turn the shampoo bottle upright.', category: 'random' },
  { video: '/blog/xgen/demos/place_the_7_up_can_into_the_left_bottom_drawer_of_the_mini_cabinet_and_close_the_drawer.mp4', instruction: 'Place the 7 Up can into the left bottom drawer of the mini cabinet and close the drawer.', category: 'organized' },
  { video: '/blog/xgen/demos/random/brush_parallel.mp4', instruction: 'Set the brush parallel to the glue stick.', category: 'random' },
  { video: '/blog/xgen/demos/place_the_bowl_into_the_top_drawer_of_the_wooden_cabinet_and_close_the_drawer.mp4', instruction: 'Place the bowl into the top drawer of the wooden cabinet and close the drawer.', category: 'organized' },
  { video: '/blog/xgen/demos/random/swap_cup_camera.mp4', instruction: 'Swap the positions of the cup and the camera.', category: 'random' },
  { video: '/blog/xgen/demos/place_the_pear_on_the_display_stand_and_the_apple_on_the_plate_both_standing_upright.mp4', instruction: 'Place the pear on the display stand and the apple on the plate, both standing upright.', category: 'organized' },
  { video: '/blog/xgen/demos/random/group_drink_separate_sponge.mp4', instruction: 'Group the drink items together and separate the sponge away.', category: 'random' },
  { video: '/blog/xgen/demos/position_the_blue_toy_car_so_it_is_partly_hanging_off_the_front_edge_of_the_display_stand.mp4', instruction: 'Position the blue toy car so it is partly hanging off the front edge of the display stand.', category: 'organized' },
  { video: '/blog/xgen/demos/random/push_ball_left_table.mp4', instruction: 'Push the ball over to the left side of the table.', category: 'random' },
  { video: '/blog/xgen/demos/put_all_the_tools_above_the_black_box_into_the_storage_box.mp4', instruction: 'Put all the tools above the black box into the storage box.', category: 'organized' },
  { video: '/blog/xgen/demos/random/cup_upsidedown.mp4', instruction: 'Turn the cup upsidedown on the table.', category: 'random' },
  { video: '/blog/xgen/demos/stack_the_two_pieces_of_bread_together_and_place_the_jam_in_the_remaining_open_spot.mp4', instruction: 'Stack the two pieces of bread together and place the jam in the remaining open spot.', category: 'organized' },
  { video: '/blog/xgen/demos/random/line_up.mp4', instruction: 'Arrange the bolt, brush and clay pestle in a straight line from left to right', category: 'random' },
  { video: '/blog/xgen/demos/tilt_the_olive_oil_bottle_slightly_10_degrees_to_the_right.mp4', instruction: 'Tilt the olive oil bottle slightly 10 degrees to the right.', category: 'organized' },
];

const DemoSlide = ({ slide, isActive, onEnded }: {
  slide: typeof DEMO_SLIDES[number];
  isActive: boolean;
  onEnded: () => void;
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.currentTime = 0;
      video.playbackRate = 1.5;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <div className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-20 scale-[0.85]'}`}>
      <div className={`mt-1 mb-1.5 text-[10px] font-semibold uppercase ${
        slide.category === 'organized' ? 'text-[#0f766e]' : 'text-[#b45309]'
      }`}>
        {slide.category === 'organized' ? 'Organized Scene*' : 'Random Scene*'}
      </div>
      <video
        ref={videoRef}
        className={`w-full rounded-lg transition-shadow duration-300 ${isActive ? (slide.category === 'organized' ? 'shadow-[0_0_40px_8px_rgba(15,118,110,0.25)]' : 'shadow-[0_0_40px_8px_rgba(180,83,9,0.25)]') : ''}`}
        src={publicFilePath(slide.video)}
        muted
        playsInline
        onEnded={onEnded}
      />
      <p className='mt-3 text-lg font-semibold text-[#031425]'>
        &ldquo;{slide.instruction}&rdquo;
      </p>
    </div>
  );
};

const DemoCarousel = () => {
  const swiperRef = React.useRef<any>(null);
  return (
  <section className='mt-14 pb-12 border-b border-slate-200'>
    <div className='mx-auto mb-8 max-w-4xl text-center'>
      <div className='text-xs font-semibold uppercase text-[#0f766e]'>Generated trajectory samples</div>
      <h2 className='mt-3 text-2xl font-semibold tracking-normal text-[#031425]'>
        Fully automatic robot data, zero manual annotation
      </h2>
      <p className='mt-4 text-base leading-8 text-slate-600'>
        These clips require no human teleoperation or manual annotation. RoboInF generates the scenes, instructions, rewards, motion programs, and successful rollouts end to end.
      </p>
      <p className='mt-2 text-base leading-8 text-slate-600'>
        The tasks go beyond scaling simple pick-and-place: they span two axes, from{' '}
        <span className='font-semibold text-[#031425]'>short-horizon</span> to{' '}
        <span className='font-semibold text-[#031425]'>long-horizon</span> tasks and from{' '}
        <span className='font-semibold text-[#031425]'>rigid-body</span> manipulation to{' '}
        <span className='font-semibold text-[#031425]'>articulation</span>.
      </p>
    </div>
    <Swiper
      modules={[Navigation, EffectCoverflow]}
      effect='coverflow'
      coverflowEffect={{ rotate: 0, stretch: 0, depth: 300, modifier: 1, slideShadows: false }}
      loop
      centeredSlides
      slidesPerView={1.8}
      spaceBetween={0}
      navigation
      onSwiper={(swiper) => { swiperRef.current = swiper; }}
      className='demo-carousel'
    >
      {DEMO_SLIDES.map((slide, i) => (
        <SwiperSlide key={i}>
          {({ isActive }) => (
            <DemoSlide slide={slide} isActive={isActive} onEnded={() => swiperRef.current?.slideNext()} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
    <p className='mt-4 text-sm text-slate-500'>
      *<strong className='text-slate-600'>Organized scenes</strong> are agentically reconstructed from real-world reference images into simulation (see <a href='#pipeline-module' className='text-[#0f766e] hover:underline'>Scene Generation</a>).{' '}
      <strong className='text-slate-600'>Random scenes</strong> sample objects and layouts for broad combinatorial coverage. Videos are shown at 1.5× speed.
    </p>
  </section>
  );
};

const CopyablePre = ({ children }: { children: React.ReactNode }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className='relative my-6 group'>
      <button
        type='button'
        onClick={() => {
          navigator.clipboard.writeText(getMarkdownText(children));
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className='absolute right-3 top-3 z-10 rounded-md border border-white/20 bg-white/10 p-1.5 text-white/60 opacity-0 transition hover:bg-white/20 hover:text-white group-hover:opacity-100'
        aria-label='Copy to clipboard'
      >
        {copied ? (
          <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <polyline points='20 6 9 17 4 12'/>
          </svg>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <rect x='9' y='9' width='13' height='13' rx='2' ry='2'/>
            <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'/>
          </svg>
        )}
      </button>
      <pre className='overflow-x-auto rounded-xl bg-[#07182a]'>{children}</pre>
    </div>
  );
};

const RoboCraftMarkdown = ({
  content,
  activeCitation,
  setActiveCitation,
}: {
  content: string;
  activeCitation?: string;
  setActiveCitation: (id: string) => void;
}) => (
  <ReactMarkdown
    className='robocraft-markdown'
    rehypePlugins={[rehypeRaw, rehypeHighlightPlugin]}
    linkTarget="_blank"
    components={{
      h2(props) {
        const text = getMarkdownText(props.children);
        return (
          <h2 id={slugify(text)} className='scroll-mt-28 pt-8 text-3xl font-semibold leading-tight text-[#031425]'>
            {props.children}
          </h2>
        );
      },
      h3(props) {
        return (
          <h3 className='mt-8 text-xl font-semibold leading-snug text-[#031425]'>{props.children}</h3>
        );
      },
      p(props) {
        return <p className='mt-5 text-[15px] leading-8 text-slate-700'>{props.children}</p>;
      },
      ul(props) {
        return <ul className='mt-4 list-disc space-y-2 pl-5 text-[15px] leading-8 text-slate-700'>{props.children}</ul>;
      },
      ol(props) {
        return <ol className='mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-8 text-slate-700'>{props.children}</ol>;
      },
      li(props) {
        return <li className='pl-1'>{props.children}</li>;
      },
      strong(props) {
        return <strong className='font-semibold text-[#031425]'>{props.children}</strong>;
      },
      blockquote(props) {
        return (
          <blockquote className='mt-6 border-l-4 border-[#0f766e] bg-[#ecfdf5] px-5 py-4 text-[15px] leading-8 text-slate-700'>
            {props.children}
          </blockquote>
        );
      },
      details(props) {
        return (
          <details className='mt-6 border-y border-slate-200 py-4 text-slate-700'>
            {props.children}
          </details>
        );
      },
      summary(props) {
        return (
          <summary className='cursor-pointer text-sm font-semibold text-[#0f766e]'>
            {props.children}
          </summary>
        );
      },
      a(props) {
        const isRefCitation = props.href && props.href.match(/^#ref\d+$/);

        if (isRefCitation && props.href) {
          const citationId = props.href.replace('#', '');
          return (
            <a
              href={props.href}
              onClick={(event) => {
                event.preventDefault();
                setActiveCitation(citationId);
                const targetId =
                  window.innerWidth >= 1280 ? citationId : `${citationId}-mobile`;
                document.getElementById(targetId)?.scrollIntoView({
                  block: 'nearest',
                  behavior: 'smooth',
                });
              }}
              className={`mx-0.5 align-super text-[11px] font-semibold no-underline transition-colors ${
                activeCitation === citationId
                  ? 'text-[#6C4AAF]'
                  : 'text-[#0156AC] hover:text-[#6C4AAF]'
              }`}
            >
              {props.children}
            </a>
          );
        }

        return (
          <a
            href={props.href}
            target="_blank"
            className='font-medium text-[#0156AC] underline decoration-[#0156AC]/30 underline-offset-4 hover:text-[#6C4AAF]'
          >
            {props.children}
          </a>
        );
      },
      code(props) {
        if (!props.className) {
          return (
            <code className='rounded bg-[#edf4ff] px-1.5 py-0.5 font-mono text-[13px] text-[#0156AC]'>
              {props.children}
            </code>
          );
        }

        return (
          <code className='block whitespace-pre-wrap rounded-xl bg-[#07182a] p-5 font-mono text-[13px] leading-7 text-[#d9f2ff]'>
            {props.children}
          </code>
        );
      },
      pre(props) {
        return <CopyablePre>{props.children}</CopyablePre>;
      },
    }}
  >
    {content}
  </ReactMarkdown>
);

const StageExplorer = ({
  stages,
  activeStage,
  setActiveStage,
  activeCitation,
  setActiveCitation,
}: {
  stages: RoboCraftStage[];
  activeStage: number;
  setActiveStage: (stage: number) => void;
  activeCitation?: string;
  setActiveCitation: (id: string) => void;
}) => {
  if (!stages.length) return null;

  const stage = stages[activeStage];
  const go = (direction: -1 | 1) => {
    setActiveStage((activeStage + direction + stages.length) % stages.length);
  };

  return (
    <section id='pipeline-module' className='scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-[0_4px_24px_rgba(15,23,42,0.04)] sm:p-7'>
      <div className='mb-6 flex items-center justify-between gap-4'>
        <div>
          <div className='text-xs font-semibold uppercase text-[#0f766e]'>
            Pipeline Explorer
          </div>
          <h2 className='mt-2 text-3xl font-semibold text-[#031425]'>
            The five-stage generation loop
          </h2>
        </div>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={() => go(-1)}
            className='h-9 w-9 rounded-full border border-slate-200 bg-white text-lg text-slate-500 transition hover:-translate-x-0.5 hover:border-[#0f766e] hover:text-[#0f766e]'
            aria-label='Previous pipeline stage'
          >
            ‹
          </button>
          <button
            type='button'
            onClick={() => go(1)}
            className='h-9 w-9 rounded-full border border-slate-200 bg-white text-lg text-slate-500 transition hover:translate-x-0.5 hover:border-[#0f766e] hover:text-[#0f766e]'
            aria-label='Next pipeline stage'
          >
            ›
          </button>
        </div>
      </div>

      <div className='mb-8 overflow-x-auto'>
        <div className='grid min-w-[620px] grid-cols-5 rounded-full border border-slate-200 bg-[#f6f7f6] p-1'>
          {stages.map((item, index) => (
            <button
              key={item.id}
              type='button'
              onClick={() => setActiveStage(index)}
              className={`rounded-full px-3 py-2 text-left transition ${
                index === activeStage
                  ? 'bg-white text-[#031425] shadow-sm'
                  : 'text-slate-500 hover:text-[#0f766e]'
              }`}
            >
              <span className='mr-2 text-[11px] font-semibold uppercase opacity-60'>
                0{index + 1}
              </span>
              <span className='text-sm font-semibold'>{item.shortTitle}</span>
            </button>
          ))}
        </div>
      </div>

      <div className='border-t border-slate-200 pt-7'>
        <div className='mb-2 text-xs font-semibold uppercase text-[#b45309]'>
          {stage.kicker}
        </div>
        <h3 className='text-2xl font-semibold leading-tight text-[#031425]'>
          {stage.title}
        </h3>
        <RoboCraftMarkdown
          content={stage.content}
          activeCitation={activeCitation}
          setActiveCitation={setActiveCitation}
        />
        {stage.mediaKind === 'rewardPlaceholder' && (
          <div className='mt-8'>
            <RewardCodeExhibit />
          </div>
        )}
        {stage.mediaKind === 'motionPlaceholder' && (
          <div className='mt-8'>
            <MotionCodeExhibit />
          </div>
        )}
        {stage.mediaKind !== 'none' && stage.mediaKind !== 'rewardPlaceholder' && stage.mediaKind !== 'motionPlaceholder' && (
          <div className='mt-8'>
            <StageMedia stage={stage} />
          </div>
        )}
      </div>
    </section>
  );
};

const RewardCodeExhibit = () => {
  const [activeTab, setActiveTab] = useState<'logic' | 'code'>('logic');
  const excerptHtml = useMemo(() => hljs.highlight(REWARD_CODE_EXCERPT, { language: 'python' }).value, []);
  const fullCodeHtml = useMemo(() => hljs.highlight(FULL_REWARD_CODE, { language: 'python' }).value, []);

  return (
    <section className='overflow-hidden rounded-xl border border-slate-200 bg-white'>
      <div className='flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3'>
        <div>
          <div className='text-xs font-semibold uppercase text-[#0f766e]'>Generated reward exhibit</div>
          <div className='mt-1 text-sm font-semibold text-[#031425]'>
            Knife-in-box, then box-on-cutting-board
          </div>
        </div>
        <div className='flex rounded-full border border-slate-200 bg-[#f6f7f6] p-1'>
          {[
            { id: 'logic' as const, label: 'Logic' },
            { id: 'code' as const, label: 'Full code' },
          ].map((tab) => (
            <button
              key={tab.id}
              type='button'
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-[#031425] text-white shadow-sm'
                  : 'text-slate-500 hover:text-[#031425]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'logic' ? (
        <div className='grid gap-4 p-4 md:grid-cols-[minmax(0,1fr)_220px]'>
          <div>
            <p className='text-sm leading-7 text-slate-600'>
              The generated reward keeps stage order explicit: first the knife must enter the box, then the box must move onto the cutting board, while the knife remains inside after stage one completes.
            </p>
            <pre className='mt-4 overflow-x-auto rounded-lg bg-[#07182a] p-4 text-sm leading-7 text-[#d9f2ff]'>
              <code dangerouslySetInnerHTML={{ __html: excerptHtml }} />
            </pre>
          </div>
          <div>
            <div className='text-xs font-semibold uppercase text-slate-500'>Predicate mix</div>
            <div className='mt-3 flex flex-wrap gap-2'>
              {REWARD_PREDICATE_CHIPS.map((chip) => (
                <span key={chip} className='rounded-full border border-[#0f766e]/20 bg-white px-3 py-1 text-xs font-medium text-[#0f766e]'>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='p-4'>
          <pre className='max-h-[560px] overflow-auto rounded-lg bg-[#07182a] p-5 text-sm leading-7 text-[#d9f2ff]'>
            <code dangerouslySetInnerHTML={{ __html: fullCodeHtml }} />
          </pre>
        </div>
      )}
    </section>
  );
};

const MotionCodeExhibit = () => {
  const [activeTab, setActiveTab] = useState<'logic' | 'code'>('logic');

  return (
    <section className='overflow-hidden rounded-xl border border-slate-200 bg-white'>
      <div className='flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3'>
        <div>
          <div className='text-xs font-semibold uppercase text-[#0f766e]'>Generated motion-code exhibit</div>
          <div className='mt-1 text-sm font-semibold text-[#031425]'>
            Place can in drawer, close drawer
          </div>
        </div>
        <div className='flex rounded-full border border-slate-200 bg-[#f6f7f6] p-1'>
          {[
            { id: 'logic' as const, label: 'Logic' },
            { id: 'code' as const, label: 'Full code' },
          ].map((tab) => (
            <button
              key={tab.id}
              type='button'
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-[#031425] text-white shadow-sm'
                  : 'text-slate-500 hover:text-[#031425]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'logic' ? (
        <div className='grid gap-4 p-4 md:grid-cols-[minmax(0,1fr)_220px]'>
          <div>
            <p className='text-sm leading-7 text-slate-600'>
              The agent decomposes the task into three phases: open the drawer by pulling the handle, pick the can and release it inside, then re-grasp the handle and push the drawer closed.
            </p>
            <pre className='mt-4 overflow-x-auto rounded-lg bg-[#07182a] p-4 text-sm leading-7 text-[#d9f2ff]'>
              <code>{MOTION_CODE_EXCERPT}</code>
            </pre>
          </div>
          <div>
            <div className='text-xs font-semibold uppercase text-slate-500'>Motion primitives</div>
            <div className='mt-3 flex flex-wrap gap-2'>
              {MOTION_PRIMITIVE_CHIPS.map((chip) => (
                <span key={chip} className='rounded-full border border-[#0f766e]/20 bg-white px-3 py-1 text-xs font-medium text-[#0f766e]'>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='p-4'>
          <pre className='max-h-[560px] overflow-auto rounded-lg bg-[#07182a] p-5 text-sm leading-7 text-[#d9f2ff]'>
            <code>{FULL_MOTION_CODE}</code>
          </pre>
        </div>
      )}
    </section>
  );
};

const StageMedia = ({ stage }: { stage: RoboCraftStage }) => {
  if (stage.mediaKind === 'none') {
    return null;
  }

  if (stage.mediaKind === 'scene') {
    return (
      <figure className='overflow-hidden rounded-xl border border-slate-200 bg-white/60'>
        <div className='relative aspect-[16/9] w-full bg-[#ebe7e2]'>
          <Image
            src={publicFilePath('/blog/xgen/scene.webp')}
            alt='Generated simulation scenes'
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        </div>
        <figcaption className='border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-500'>
          Generated tabletop scenes from the scene generation stage.
        </figcaption>
      </figure>
    );
  }

  if (stage.mediaKind === 'trajectoryVideo') {
    return (
      <figure className='overflow-hidden rounded-xl border border-slate-200 bg-[#031425]'>
        <video
          className='w-full'
          src={publicFilePath('/blog/xgen/traj_gen_demo_grid.mp4')}
          controls
          muted
          loop
          playsInline
        />
        <figcaption className='border-t border-white/10 bg-white px-5 py-4 text-sm leading-6 text-slate-500'>
          3x3 trajectory-generation demo for the same task under different augmentations, including background, table texture, object initial pose, lighting, camera pose, robot initial pose, and instruction variation.
        </figcaption>
      </figure>
    );
  }

  if (stage.mediaKind === 'taskPlaceholder') {
    return (
      <figure className='overflow-hidden rounded-xl border border-slate-200 bg-white/60'>
        <div className='relative aspect-[16/9] w-full bg-[#ebe7e2]'>
          <Image
            src={publicFilePath('/blog/xgen/task_gen.png')}
            alt='Scene with labeled objects for task generation'
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        </div>
        <figcaption className='border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-500'>
          A generated tabletop scene with object annotations. RoboCraft extracts object identities and spatial relationships from each scene, then prompts an LLM to propose feasible natural-language instructions grounded in the current layout.
        </figcaption>
      </figure>
    );
  }

  const placeholderCopy =
    stage.mediaKind === 'rewardPlaceholder'
        ? {
            label: 'Reward generation figure',
            text: 'Reserved for a diagram showing how language goals become executable reward code.',
          }
        : stage.mediaKind === 'motionPlaceholder'
          ? {
              label: 'Motion-code refinement figure',
              text: 'Reserved for a visual showing agent-written robot programs, simulator feedback, and iterative repair.',
            }
        : {
            label: 'Media slot',
            text: 'Reserved for a stage figure or video.',
          };

  return (
    <div className='flex min-h-[240px] flex-col justify-between rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5'>
      <div>
        <div className='text-[10px] font-semibold uppercase text-[#0f766e]'>
          {placeholderCopy.label}
        </div>
        <p className='mt-4 text-sm leading-7 text-slate-500'>
          {placeholderCopy.text}
        </p>
      </div>
      <div className='border-t border-slate-100 pt-4 text-sm font-semibold text-[#0156AC]'>
        {stage.shortTitle}
      </div>
    </div>
  );
};

const RoadmapSection = () => (
  <section id='roadmap' className='scroll-mt-28 border-t border-slate-200 pt-12'>
    <h2 className='text-3xl font-semibold leading-tight text-[#031425]'>
      Current Scope and Next Steps
    </h2>
    <p className='mt-4 max-w-3xl text-sm leading-7 text-slate-600'>
      This preview focuses on scalable, controllable data generation today. The same pipeline points to the next physical settings, embodiments, and data mixtures we are expanding toward.
    </p>
    <div className='mt-6 overflow-hidden border-y border-slate-200'>
      <div className='grid grid-cols-1 bg-[#031425] text-xs font-semibold uppercase text-white md:grid-cols-3'>
        <div className='p-3'>Today</div>
        <div className='border-l border-white/10 p-3'>Next</div>
        <div className='border-l border-white/10 p-3'>Why it matters</div>
      </div>
      {ROADMAP_ITEMS.map((item, index) => (
        <div
          key={item.today}
          className={`grid grid-cols-1 text-sm leading-6 text-slate-700 md:grid-cols-3 ${
            index % 2 === 0 ? 'bg-white/50' : 'bg-transparent'
          }`}
        >
          <div className='border-t border-slate-200 p-4 font-semibold text-[#031425]'>{item.today}</div>
          <div className='border-t border-slate-200 p-4 md:border-l'>{item.next}</div>
          <div className='border-t border-slate-200 p-4 md:border-l'>{item.why}</div>
        </div>
      ))}
    </div>
  </section>
);

const ReferenceRail = ({
  references,
  activeCitation,
}: {
  references: Reference[];
  activeCitation?: string;
}) => (
  <div className='sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 text-slate-400'>
    <div className='mb-4 text-[11px] font-semibold uppercase text-slate-400'>
      References
    </div>
    <div className='flex flex-col gap-3'>
      {references.map((reference) => (
        <div
          key={reference.id}
          id={reference.id}
          className={`scroll-mt-28 border-l pl-3 transition-colors ${
            activeCitation === reference.id
              ? 'border-[#6C4AAF]/70 text-slate-600'
              : 'border-slate-200/50 hover:border-slate-300 hover:text-slate-500'
          }`}
        >
          <div className='mb-1 text-[11px] font-semibold'>[{reference.number}]</div>
          <div className='text-[11px] leading-5'>{reference.text}</div>
        </div>
      ))}
    </div>
  </div>
);

const ReferencesList = ({
  references,
  activeCitation,
  idSuffix = '',
}: {
  references: Reference[];
  activeCitation?: string;
  idSuffix?: string;
}) => (
  <div className='flex flex-col gap-3'>
    {references.map((reference) => (
      <div
        key={reference.id}
        id={`${reference.id}${idSuffix}`}
        className={`scroll-mt-28 border-l px-3 py-2 transition-colors ${
          activeCitation === reference.id
            ? 'border-[#6C4AAF]/60 bg-[#f8f5ff]'
            : 'border-slate-200'
        }`}
      >
        <div className='mb-1 text-xs font-semibold text-slate-500'>[{reference.number}]</div>
        <div className='text-xs leading-5 text-slate-600'>{reference.text}</div>
      </div>
    ))}
  </div>
);

const PostImage = ({
  coverImage,
  title,
}: {
  coverImage?: string;
  title: string;
}) => (
  <div className='relative w-full aspect-video rounded-lg'>
    {coverImage ? (
      <Image
        src={publicFilePath(coverImage)}
        alt={title}
        fill
        style={{ objectFit: 'contain', objectPosition: 'center top' }}
      />
    ) : (
      <div className='bg-[#D9D9D9] w-full h-full' />
    )}
  </div>
);

const PostMeta = ({ date, author, twitterUrl, githubUrl }: { date: string; author: string; twitterUrl: string, githubUrl: string }) => (
  <div className='relative w-full font-[600] text-xs flex flex-wrap grid grid-cols-3 mb-4'>
    <div className='flex flex-col justify-center items-center'>
      <div className='text-[#666666] mb-2'>Author</div>
      <div>{author}</div>
    </div>

    <div className='flex flex-col justify-center items-center'>
      <div className='text-[#666666] mb-2'>Date</div>
      <div>{parseDateString(date)}</div>
    </div>

    <div className='flex flex-col justify-center items-center'>
      <div className='text-[#666666] mb-2'>Share</div>
      <PostShare twitterUrl={twitterUrl} githubUrl={githubUrl}/>
    </div>
  </div>
);

const PostShare = ({ twitterUrl, githubUrl }: { twitterUrl: string, githubUrl: string }) => (
  <ul className='flex gap-4'>
    <li className='cursor-pointer'>
      <Link href='https://join.slack.com/t/xlanggroup/shared_invite/zt-20zb8hxas-eKSGJrbzHiPmrADCDX3_rQ'>
        <Image
          src={publicFilePath('/icons/slack-black.svg')}
          alt='Xlang'
          width={20}
          height={20}
          className='rounded-md'
        />
      </Link>
    </li>
    <li className='cursor-pointer'>
      <Link href={githubUrl}>
        <Image
          src={publicFilePath('/icons/github-black.svg')}
          alt='Xlang'
          width={20}
          height={20}
          className='rounded-md'
        />
      </Link>
    </li>
    <li className='cursor-pointer'>
      <Link href={twitterUrl}>
        <Image
          src={publicFilePath('/icons/twitter-black.svg')}
          alt='Xlang'
          width={20}
          height={20}
          className='rounded-md'
        />
      </Link>
    </li>
  </ul>
);

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default BlogPost;
