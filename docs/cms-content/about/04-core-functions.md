# Page 4 — Core Functions & Services

**Title:** Core Functions &amp; Services  
**Slug:** `about-core-functions`  
**Navigation:** About  
**Order:** 4  
**Status:** published

---

## Body HTML (paste into the CMS Body field)

```html
<h2>Core Functions &amp; Services</h2>

<p>
  The following services are available from the Department,
  Dzongkhag/Thromde/Drungkhag Civil Registration and Census Offices and
  Community Centers.
</p>

<table>
  <thead>
    <tr>
      <th>Sl #</th>
      <th>Services</th>
      <th>Mode</th>
      <th>Department</th>
      <th>Dzongkhag / Thromde</th>
      <th>Drungkhag [1]</th>
      <th>Community Center</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Registration of Birth</td>
      <td>Online</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Issuance of New Citizenship / Special Resident Card</td>
      <td>Online</td>
      <td>✓</td>
      <td>✓</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>3</td>
      <td>Lost / Replacement Citizenship / Special Resident Card</td>
      <td>Online</td>
      <td>✓</td>
      <td>✓</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>4</td>
      <td>Name Change &amp; Correction of Date of Birth</td>
      <td>Online</td>
      <td>✓</td>
      <td>✓</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>5</td>
      <td>Issuance of Nationality Certificate</td>
      <td>Online</td>
      <td>✓</td>
      <td>✓</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>6</td>
      <td>Issuance of Household Information</td>
      <td>Online</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>7</td>
      <td>Processing of Census Transfer</td>
      <td>Online</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>8</td>
      <td>Updating Individual Information of Citizen / SRC Holder</td>
      <td>Online</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td></td>
    </tr>
    <tr>
      <td>9</td>
      <td>Updating Head of Household</td>
      <td>Online</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td></td>
    </tr>
    <tr>
      <td>10</td>
      <td>Updating Spouse Information</td>
      <td>Online</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td></td>
    </tr>
    <tr>
      <td>11</td>
      <td>Issuance of Individual Information</td>
      <td>Online</td>
      <td>✓</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>12</td>
      <td>Verify Credential for Security Clearance</td>
      <td>Online</td>
      <td>✓</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>13</td>
      <td>Updating of Regularization and Naturalization</td>
      <td>Online</td>
      <td>✓</td>
      <td>✓</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>14</td>
      <td>Updating of Adoption Cases</td>
      <td>Online</td>
      <td>✓</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>15</td>
      <td>Registration of Death</td>
      <td>Online</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>16</td>
      <td>Issuance of Relationship Certificate</td>
      <td>Offline</td>
      <td>✓</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>17</td>
      <td>Annual Census Program of Dzongkhags and Thromdes</td>
      <td>Offline</td>
      <td></td>
      <td>✓</td>
      <td>✓</td>
      <td></td>
    </tr>
  </tbody>
</table>

<p>
  <strong>[1]</strong> Drungkhag Services are available only in Phuentsholing,
  Umling (Gelephu), Trashicholing (Sipsu) and Lhamiozingkha Drungkhags.
</p>
```

---

## Notes

- Empty cells in the Mode / availability columns intentionally left blank (service not offered at that office type).
- To add a new service, insert a new `<tr>` row and increment the `Sl #`.
- To change a service from Online to Offline (or vice versa), edit only the `<td>` in the **Mode** column.
- The footnote `[1]` must stay in sync with the `Drungkhag [1]` column header.
