// @ts-nocheck
import * as __fd_glob_9 from "../content/docs/components/tubelight-accordion.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/components/text-morph-button.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/components/smooth-accordion.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/components/multi-follow-cursor.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/components/magnetic-filings.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/components/luminated-checkbox.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/components/gooey-menu.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/components/flashlight-tabs.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/components/draggable-cards.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/index.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {}, {"index.mdx": __fd_glob_0, "components/draggable-cards.mdx": __fd_glob_1, "components/flashlight-tabs.mdx": __fd_glob_2, "components/gooey-menu.mdx": __fd_glob_3, "components/luminated-checkbox.mdx": __fd_glob_4, "components/magnetic-filings.mdx": __fd_glob_5, "components/multi-follow-cursor.mdx": __fd_glob_6, "components/smooth-accordion.mdx": __fd_glob_7, "components/text-morph-button.mdx": __fd_glob_8, "components/tubelight-accordion.mdx": __fd_glob_9, });