import { z } from "zod";

const LinkUtm = z.object({
  /**
   * UTM: The source of the link.
   */
  utm_source: z.string({ description: "UTM: The source of the link" }).optional(),
  /**
   * UTM: The medium of the link.
   */
  utm_medium: z.string({ description: "UTM: The medium of the link" }).optional(),
  /**
   * UTM: The campaign of the link.
   */
  utm_campaign: z.string({ description: "UTM: The campaign of the link" }).optional(),
  /**
   * UTM: The term of the link.
   */
  utm_term: z.string({ description: "UTM: The term of the link" }).optional(),
  /**
   * UTM: The content of the link.
   */
  utm_content: z.string({ description: "UTM: The content of the link" }).optional(),
});
const OGLink = z.object({
  /**
   * The title of the link for Open Graph.
   */
  og_title: z.string({ description: "The title of the link" }).optional(),
  /**
   * The description of the link for Open Graph.
   */
  og_description: z.string({ description: "The description of the link" }).optional(),
  /**
   * The image of the link for Open Graph.
   */
  og_image: z.string({ description: "The image of the link" }).optional(),
});
const LinkBase = z.object({
  /**
   * The url for the link, where it will redirect/point to.
   */
  url: z.string({ description: "The original URL" }),

  /**
   * The unique public key for the link, which is shareable.
   */
  key: z.string({ description: "The public shareable and unique key" }),
  // rewrite: z.boolean({ description: "If the link should be rewritten" }),
});
const LinkAnalytics = z.object({
  private: z
    .boolean({ description: "If the analytics of the link are private" })
    .optional()
    .default(false),

  /**
   * The number of times the link was visited.
   */
  visits: z
    .number({
      description: "The number of times the link was visited",
    })
    .optional()
    .default(0),

  /**
   * The date when the link was last visited.
   */
  lastVisited: z
    .date({ description: "The date when the link was last visited" })
    .optional(),

  /**
   * The date when the link was created.
   */
  createdAt: z.date({
    description: "The date when the link was created",
  }),

  /**
   * The date when the link will expire.
   */
  expiresAt: z
    .date({
      description: "The date when the link will expire",
    })
    .optional(),

  /**
   * The date when the link was last updated.
   */
  updatedAt: z
    .date({
      description: "The date when the link was last updated",
    })
    .optional(),

  /**
   * The date when the link was deleted.
   */
  deletedAt: z
    .date({
      description: "The date when the link was deleted",
    })
    .optional(),
});

export const Link = z
  .object({
    /**
     * The unique identifier of the link in the database.
     */
    id: z
      .string({
        description: "The unique identifier of the link in the database",
      })
      .uuid({ message: "The ID must be a valid UUID" })
      .or(
        z
          .string({
            description: "The unique identifier of the link in the database",
          })
          .cuid({
            message: "The ID must be a valid CUID",
          }),
      ),

    /**
     * The domain of the generated link. (e.g. https://example.com/)
     */
    domain: z.string({
      description: "The domain of the generated link",
    }),

    /**
     * If the link is cloaked, it will hide the original URL.
     */
    cloak: z
      .boolean({
        description: "If the link is cloaked, it will hide the original URL",
      })
      .optional()
      .default(false),
  })
  .merge(LinkBase)
  .merge(LinkAnalytics)
  .merge(LinkUtm)
  .merge(OGLink);

export type Link = z.infer<typeof Link>;
export type ToCreateLink = Omit<Link, "id" | "createdAt">;
export type CreatedLink = Pick<Link, "id" | "key">;
export type UpdateLink = Partial<Omit<Link, "id" | "key" | "createdAt">>;
