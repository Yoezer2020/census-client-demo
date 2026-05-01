# About Us — CMS Content Guide

The **About Us** page in the Client Portal is driven by six CMS content pages.
Each file in this folder corresponds to one page entry you must create in the
Admin Portal under **Content Management → Pages**.

---

## How to publish

1. Log in to the Admin Portal.
2. Navigate to **Content Management → Navigation** and ensure a navigation item
   named **"About"** (slug `about`, URL `/about`) exists and is **Active**.
3. Navigate to **Content Management → Pages** and create each page below,
   assigning it to the **"About"** navigation item.
4. Open each `.md` file, find the `Body HTML` section, and copy **only the
   HTML lines between the triple-backtick fences** — do **not** copy the
   ` ```html ` or ` ``` ` lines themselves. Paste the raw HTML into the
   **Body** field of the page editor.
5. Set the page **Status** to `published` (or leave as `draft` — both render).
6. The Client Portal will revalidate and reflect the changes automatically.

---

## Pages to create

| #   | Page Title                | Slug                   | File                          |
| --- | ------------------------- | ---------------------- | ----------------------------- |
| 1   | Introduction              | `about-introduction`   | `01-introduction.md`          |
| 2   | Genesis and Mandate       | `about-genesis`        | `02-genesis-and-mandate.md`   |
| 3   | Vision, Mission & Values  | `about-vision`         | `03-vision-mission-values.md` |
| 4   | Core Functions & Services | `about-core-functions` | `04-core-functions.md`        |
| 5   | Way Forward               | `about-way-forward`    | `05-way-forward.md`           |
| 6   | Organogram                | `about-organogram`     | `06-organogram.md`            |

---

## Suggested page order

Set the **Order** field to `1` through `6` to control the sub-menu sequence
shown in the navigation bar.
