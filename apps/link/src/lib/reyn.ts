import { CreatedLink, Link, ToCreateLink, UpdateLink } from "./schemas";

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Reyn {}

export interface Adapter {
  create(link: ToCreateLink): Promise<CreatedLink>;
  url(id: Link["id"]): Promise<Link["url"]>;
  update(link: UpdateLink): Promise<Link>;
  delete(id: Link["id"]): Promise<void>;
  list(): Promise<Link[]>;
  visit(id: Link["id"]): Promise<void>;
  search(query: string): Promise<Link[]>;
}

export class Reyn {}
