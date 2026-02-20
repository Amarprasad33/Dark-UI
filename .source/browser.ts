// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "components/draggable-cards.mdx": () => import("../content/docs/components/draggable-cards.mdx?collection=docs"), "components/flashlight-tabs.mdx": () => import("../content/docs/components/flashlight-tabs.mdx?collection=docs"), "components/gooey-menu.mdx": () => import("../content/docs/components/gooey-menu.mdx?collection=docs"), "components/luminated-checkbox.mdx": () => import("../content/docs/components/luminated-checkbox.mdx?collection=docs"), "components/magnetic-filings.mdx": () => import("../content/docs/components/magnetic-filings.mdx?collection=docs"), "components/multi-follow-cursor.mdx": () => import("../content/docs/components/multi-follow-cursor.mdx?collection=docs"), "components/smooth-accordion.mdx": () => import("../content/docs/components/smooth-accordion.mdx?collection=docs"), "components/tubelight-accordion.mdx": () => import("../content/docs/components/tubelight-accordion.mdx?collection=docs"), }),
};
export default browserCollections;