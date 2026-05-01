# Page 6 — Organogram

**Title:** Organogram  
**Slug:** `about-organogram`  
**Navigation:** About  
**Order:** 6  
**Status:** published

---

## Option A — Upload as an image (recommended)

The organogram is a visual hierarchy chart. The simplest way to keep it
editable from the Admin Portal is to:

1. Export the organogram as a **PNG or SVG** (from PowerPoint, Visio, Lucidchart, etc.).
2. Upload it to **Content Management → Media Library** under the `media` category.
3. Copy the image URL and use the HTML below as the page body.

```html
<h2>Organogram</h2>
<p><em>Department of Civil Registration and Census</em></p>

<img
  src="REPLACE_WITH_MEDIA_LIBRARY_URL"
  alt="Organogram of the Department of Civil Registration and Census"
/>
```

Replace `REPLACE_WITH_MEDIA_LIBRARY_URL` with the URL copied from the Media Library.

---

## Option B — HTML text representation

If an image is not available, use the structured HTML below. It describes the
hierarchy as nested lists, which the Client Portal will render cleanly.

```html
<h2>Organogram</h2>
<p><em>Department of Civil Registration and Census</em></p>

<ul>
  <li>
    <strong>Director / Director General</strong>
    <ul>
      <li>Personal Assistant &amp; Messenger</li>
      <li>Pool Staff</li>
      <li>
        <strong>Citizen Services Division</strong>
        <ul>
          <li>Citizen Services Section</li>
          <li>Census Investigation Section</li>
          <li>Record Section</li>
        </ul>
      </li>
      <li>
        <strong>Demography &amp; Information Division</strong>
        <ul>
          <li>Database and BCRS Management Section</li>
          <li>Individual Information Update Section</li>
          <li>Card Printing Section</li>
        </ul>
      </li>
      <li>
        <strong>Population Census Division</strong>
        <ul>
          <li>Census Coordination Section</li>
          <li>Census Appeal and Investigation Section</li>
          <li>Research and Development Section</li>
        </ul>
      </li>
      <li>
        <strong>Dzongkhag / Thromde / Drungkhag CRC Office</strong>
        <ul>
          <li>
            Dzongdag / Executive Secretary / Drungpa
            <ul>
              <li>Dzongkhag Civil Registration and Census Office</li>
              <li>Thromde Civil Registration and Census Office</li>
              <li>Drungkhag Civil Registration and Census Office</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

---

## Notes

- **Option A is preferred** — an image is easier to update and looks identical to the original visual design.
- If the department structure changes (new division, renamed section, etc.), update this file first, then re-paste into the CMS.
- When using Option B, the nested `<ul>` / `<li>` tags are automatically indented by the Client Portal's prose styles.
