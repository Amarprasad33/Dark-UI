// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "components/luminated-checkbox.mdx": () => import("../content/docs/components/luminated-checkbox.mdx?collection=docs"), "components/tubelight-accordion.mdx": () => import("../content/docs/components/tubelight-accordion.mdx?collection=docs"), }),
};
export default browserCollections;