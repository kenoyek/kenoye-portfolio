-- Target: koymddmxehwrpvvyhafh. Run this COMPLETE query in that project's SQL Editor.
-- New replacement articles authorized by the site owner, not recovered original bodies.
-- Existing matching slugs are preserved. The entire transaction rolls back on a publication conflict.
-- Article transfer: 3 rows. No existing rows will be overwritten.
BEGIN;
SET LOCAL standard_conforming_strings = on;
DO $$ BEGIN
  IF to_regclass('public.blog_posts') IS NULL THEN
    RAISE EXCEPTION 'Create the blog schema first using bootstrap-blog.sql.';
  END IF;
END $$;
INSERT INTO public.blog_posts (id, title, slug, content, excerpt, cover_image_url, status, published_at, author_name, created_at, updated_at) VALUES ('5333984a-032c-411a-9ffb-e8387ad6dce7', '5 Cursor Shortcuts That Changed How I Write Code', '5-cursor-shortcuts-that-changed-how-i-write-code', '<p>
  Tab completion is an easy way to get started with Cursor. It is also easy to let it become the
  whole workflow: type a little, accept a suggestion, and keep moving. The bigger improvement comes
  when navigation, small edits, and code review become just as quick.
</p>
<p>
  These are five keyboard-first workflows I would put ahead of collecting more prompts. Some come
  from the editor foundation Cursor shares with VS Code. That is useful: familiar navigation still
  matters when an AI assistant is writing part of the code.
</p>
<p>
  <em
    >The bindings below are common defaults. Operating-system shortcuts, extensions, and custom
    keymaps can change them. Check the command name in Keyboard Shortcuts if a binding behaves
    differently in your installation.</em
  >
</p>
<h2>1. Cmd+K / Ctrl+K: make a focused inline edit</h2>
<p>
  A selected block of code gives an inline editing request a useful boundary. Highlight the function
  you want to change, open Inline Edit, and describe one specific outcome.
</p>
<p>
  For example: “Handle an empty response before reading the first item, and preserve the existing
  return type.” That is easier to review than a request to improve an entire module. The expected
  change has a location, a reason, and a constraint.
</p>
<p>
  Before accepting the edit, read the difference. Check whether the assistant changed behaviour
  outside the selected concern, widened a type, or removed an error path. A small request should
  produce a small, explainable patch.
</p>
<h2>2. Cmd+P / Ctrl+P: open the file you actually need</h2>
<p>
  Quick Open helps keep exploration deliberate. Instead of asking an assistant to rediscover a file
  you already know, open it by name and inspect the surrounding implementation.
</p>
<p>
  For a failing blog page, that might mean opening the page component, the data-loading helper, and
  the client configuration before changing any code. Seeing those boundaries makes the next question
  more useful: is the problem rendering, authentication, configuration, or the remote service?
</p>
<p>
  Giving an assistant the right file is often more effective than giving it a longer explanation of
  the wrong part of the system.
</p>
<h2>3. Cmd+Shift+O / Ctrl+Shift+O: move through symbols</h2>
<p>
  Go to Symbol in Editor makes a large file easier to inspect. Jump to a component, handler, or
  helper by its name instead of scrolling until something looks familiar.
</p>
<p>
  This is particularly useful during review. If a generated patch changes a submit handler, jump to
  that handler and trace its inputs and state updates. Then check the code that consumes its result.
</p>
<p>
  Names can suggest intent, but the implementation establishes behaviour. Symbol navigation makes it
  less tempting to approve a change based only on an assistant’s summary.
</p>
<h2>4. F12: follow the implementation</h2>
<p>
  Go to Definition is a quick way to test an assumption. A helper called
  <code>getPublishedPosts</code> sounds clear, but its name does not tell you which credentials it
  uses, what filters it applies, or how it handles a failed request.
</p>
<p>
  Follow the definition. Read the query, inspect the return type, and check the error path. On some
  keyboards, the function-key setting means using Fn+F12 or choosing Go to Definition from the
  command palette.
</p>
<p>
  This habit matters with AI-generated code because a plausible abstraction can hide the exact
  behaviour you need to verify.
</p>
<h2>5. Cmd+Shift+P / Ctrl+Shift+P: find commands without memorising everything</h2>
<p>
  The command palette connects the other workflows. Search for a command by name, discover its
  current binding, or run an action you use too infrequently to remember.
</p>
<p>
  Use it to open Keyboard Shortcuts, navigate symbols, inspect changes, or find an editor action
  before turning the problem into another chat request. It also helps when a tutorial assumes a
  keymap different from yours.
</p>
<h2>Keep the keyboard loop connected to verification</h2>
<p>
  The useful loop is simple: navigate to the relevant code, make a bounded change, inspect the
  difference, and run a check that can expose a mistake. A successful build answers a different
  question from a meaningful behavioural test; use the check that fits the change.
</p>
<p>
  Cursor can reduce the effort of producing a patch. These shortcuts help preserve the understanding
  needed to decide whether that patch belongs in the product.
</p>
', 'Five keyboard-first workflows for focused edits, faster navigation, and more deliberate review in Cursor.', 'https://res.cloudinary.com/dl4x3ljrr/image/upload/v1776124118/Screenshot_2026-04-13_at_5.37.16_PM_b0r8h8.png', 'published', '2026-11-06T11:55:06.503136Z', 'Okagua Kenoye', '2026-11-06T11:55:06.503136Z', '2026-11-06T11:55:06.503136Z') ON CONFLICT (slug) DO NOTHING;
INSERT INTO public.blog_posts (id, title, slug, content, excerpt, cover_image_url, status, published_at, author_name, created_at, updated_at) VALUES ('f3135f3c-9108-434e-b080-6dc397a8f250', 'Cursor AI and the Cost of Starting', 'cursor-ai-and-the-cost-of-starting', '<p>
  A blank editor asks for several decisions at once. What should the first component be? Where does
  the data live? How much structure is enough? Which parts are essential for the first useful
  version?
</p>
<p>
  Cursor can lower the effort of getting something onto the screen. A prompt can produce a
  component, a route, or a first attempt at an integration. That can be valuable, especially when a
  small working example helps clarify an idea.
</p>
<p>
  The important question is what happens after the first version exists. The cost of beginning
  includes the decisions the first draft encourages you to keep.
</p>
<h2>Starting quickly can help you ask better questions</h2>
<p>
  A rough interface can make an ambiguous requirement easier to discuss. A founder can react to an
  actual flow. A developer can identify the missing state. A teacher can see whether an example is
  suitable for a learner.
</p>
<p>
  At that stage, the code is a tool for understanding the problem. It does not need to become the
  final architecture simply because it was produced first.
</p>
<p>
  I prefer a starting request that names a small, observable outcome: show a list, handle an empty
  result, or demonstrate one interaction. That gives the first version a clear purpose and makes it
  easier to discard parts that do not help.
</p>
<h2>A first draft quietly creates defaults</h2>
<p>
  Generated code makes choices even when the prompt does not mention them. It chooses names,
  component boundaries, data shapes, packages, and assumptions about failure. Those choices can
  spread when later work copies the first example.
</p>
<p>
  A fetch call inside a component may be fine for a prototype. Repeating it across multiple screens
  can create inconsistent loading states and error handling. A convenient client configuration may
  also carry authentication assumptions into a public page.
</p>
<p>
  The earlier those assumptions become visible, the less expensive they are to reconsider. Ask the
  assistant to explain the boundaries it chose, then compare that explanation with the code.
</p>
<h2>Define the boundary before expanding the feature</h2>
<p>For a data-backed feature, a useful starting checklist is short:</p>
<ul>
  <li>Who is allowed to read or change this information?</li>
  <li>What happens when the request fails or never finishes?</li>
  <li>Which system owns the authoritative record?</li>
  <li>What must remain true if the implementation changes?</li>
</ul>
<p>
  These questions are particularly important for authentication, permissions, migrations, and
  publishing. A convincing screen cannot establish whether the right records are protected or
  whether a message was actually delivered.
</p>
<p>
  Write the important answers as constraints. “Published articles are readable anonymously; drafts
  require an approved administrator” is a better foundation than “build a blog.” It gives both the
  implementation and its tests something concrete to satisfy.
</p>
<h2>Review before the first draft becomes a pattern</h2>
<p>
  After a generated slice works, pause before asking for several more. Inspect the dependency
  changes. Trace the request path. Look for duplicated logic, broad permissions, placeholder data,
  and success states that do not depend on a real result.
</p>
<p>
  A useful review question is: if this pattern appeared in ten more files, would it still be
  reasonable? If the answer is no, this is a good point to adjust the structure.
</p>
<p>
  That does not mean every prototype needs an elaborate abstraction. A small explicit helper and a
  clear interface can be enough. The goal is to avoid multiplying a decision you have not examined.
</p>
<h2>Give a prototype an exit condition</h2>
<p>
  Before starting, decide what would make the experiment useful. Perhaps it needs to demonstrate a
  booking flow, validate a data model, or expose an integration risk. Once it answers that question,
  decide what to keep and what to replace.
</p>
<p>
  Record known shortcuts rather than letting them disappear into the codebase. A mocked response, a
  temporary image, and a missing permission check have very different implications. Each should have
  a clear status before the product reaches real users.
</p>
<h2>Make the beginning serve the product</h2>
<p>
  AI-assisted development is valuable when it helps a team turn uncertainty into something testable.
  The next step still requires judgment: deciding what the example proves, what it leaves
  unresolved, and whether its foundations fit the product.
</p>
<p>
  The best starting point is one you understand well enough to improve. Use the speed of the first
  draft to create room for those decisions.
</p>
', 'AI can make a first draft easier. The decisions that draft creates still need clear boundaries, review, and a purpose.', 'https://res.cloudinary.com/dl4x3ljrr/image/upload/v1774861622/WhatsApp_Image_2026-03-30_at_9.51.55_AM_gkp1mf.jpg', 'published', '2026-11-06T11:55:06.503136Z', 'Okagua Kenoye', '2026-11-06T11:55:06.503136Z', '2026-11-06T11:55:06.503136Z') ON CONFLICT (slug) DO NOTHING;
INSERT INTO public.blog_posts (id, title, slug, content, excerpt, cover_image_url, status, published_at, author_name, created_at, updated_at) VALUES ('819295ac-280d-4737-81d3-349160c83c2f', 'I Let AI Write Most of My Code Last Month. Here''s My Honest Take.', 'i-let-ai-write-most-of-my-code-last-month-heres-my-honest-take', '<p>
  When AI produces a large share of a patch, the engineering work changes shape. There is less time
  spent entering some kinds of code and more responsibility concentrated in the instructions,
  review, and verification around it.
</p>
<p>
  My honest take is that an AI-heavy workflow is useful when it strengthens that loop. The volume of
  generated code tells me much less than whether the resulting system is understandable, correct,
  and ready for the people who depend on it.
</p>
<h2>Some work benefits from a fast first pass</h2>
<p>
  Repetitive interface structure, straightforward transformations, and examples of an unfamiliar API
  can be good candidates for assistance. A draft can give you something concrete to question and
  improve.
</p>
<p>
  Specific requests help. “Add a recoverable error state to this existing request” gives the
  assistant a narrower task than “make this page production-ready.” Existing types, surrounding
  code, and a description of the expected behaviour provide useful constraints.
</p>
<p>
  I still treat the result as a proposal. Familiar-looking code deserves the same review as code
  written by a person, especially when it introduces a dependency or changes a shared abstraction.
</p>
<h2>The difficult decisions remain difficult</h2>
<p>
  AI can produce an implementation of a permission check without establishing that the permission
  model is right. It can generate a database migration without knowing whether the source contains
  records that must be preserved. It can describe a deployment without proving that a live service
  works.
</p>
<p>
  These are questions about the product and its operating environment. They require a clear account
  of who owns the data, which actions are authorised, what failure would mean, and what evidence is
  available.
</p>
<p>
  For sensitive changes, I want a small, reviewable operation with a clear verification step. A
  successful command is useful evidence, but its meaning depends on what that command actually did.
</p>
<h2>Review the request path, not just the visible screen</h2>
<p>
  A page can look complete while its data path remains fragile. Follow an interaction from the
  component to the helper, through configuration and authentication, and into the service response.
</p>
<p>
  Check whether a public read unnecessarily depends on a signed-in session. Check whether a rejected
  request becomes an error state or a misleading empty list. Check whether a “saved” message appears
  only after the service confirms the write.
</p>
<p>Those details often matter more to a user than the size or elegance of the generated patch.</p>
<h2>Use tests to challenge the implementation</h2>
<p>
  A test is most useful when it could reject a plausible but incorrect solution. For an article
  page, that might mean distinguishing a missing post from a failed request. For a migration, it
  could mean verifying that a conflicting import rolls back without replacing existing content.
</p>
<p>
  Ask for failure cases as explicitly as the happy path: an expired session, an unavailable service,
  a slow response, a repeated submission, or a user without the necessary role.
</p>
<p>
  Then inspect the test itself. A mocked success response can verify rendering, but it cannot prove
  that a remote database is reachable. Keep those conclusions separate so that a passing local suite
  does not become an unsupported claim about production.
</p>
<h2>Keep the changes small enough to explain</h2>
<p>
  A large generated change can be expensive to review even when producing it was quick. Smaller
  steps make it easier to identify which assumption failed, preserve working behaviour, and reverse
  a decision.
</p>
<p>
  Before accepting a patch, I want to explain what changed, why it is needed, how it was checked,
  and what remains uncertain. If that explanation is difficult, the change may need another pass.
</p>
<p>
  This also helps with maintenance. The next engineer should be able to understand the system from
  its code, data model, tests, and documentation rather than needing the original conversation with
  an assistant.
</p>
<h2>The standard is still ownership</h2>
<p>
  The useful question is whether AI assistance leaves you with a product you can support. That
  includes understanding its limits, acknowledging an unverified result, and making a recovery plan
  when something goes wrong.
</p>
<p>
  I am interested in tools that make that work more effective. The responsibility for the shipped
  result stays with the engineer.
</p>
', 'An honest look at AI-assisted development: faster drafts, careful verification, and responsibility for the product that ships.', 'https://res.cloudinary.com/dl4x3ljrr/image/upload/WhatsApp_Image_2026-03-23_at_10.06.33_AM_dpmmd1', 'published', '2026-11-06T11:55:06.503136Z', 'Okagua Kenoye', '2026-11-06T11:55:06.503136Z', '2026-11-06T11:55:06.503136Z') ON CONFLICT (slug) DO NOTHING;
DO $$ DECLARE published_count integer; BEGIN
  SELECT count(*) INTO published_count FROM public.blog_posts
  WHERE slug IN ('5-cursor-shortcuts-that-changed-how-i-write-code', 'cursor-ai-and-the-cost-of-starting', 'i-let-ai-write-most-of-my-code-last-month-heres-my-honest-take') AND status = 'published' AND published_at <= now();
  IF published_count <> 3 THEN
    RAISE EXCEPTION 'Expected three published articles. An existing draft or scheduled article may conflict; review it in admin. No existing articles were overwritten.';
  END IF;
END $$;
COMMIT;

SELECT title, slug, status, published_at FROM public.blog_posts
WHERE slug IN ('5-cursor-shortcuts-that-changed-how-i-write-code', 'cursor-ai-and-the-cost-of-starting', 'i-let-ai-write-most-of-my-code-last-month-heres-my-honest-take') ORDER BY title;
