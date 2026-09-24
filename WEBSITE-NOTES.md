# Controlium website redesign

Seven static pages: index.html, company.html, solutions.html, products.html, markets.html, projects.html and contact.html.

## Content and design
- Company content is based on the supplied Controlium prequalification document: company profile pages 4–6, solutions and product portfolio pages 12–33, project list pages 71–72 and project references pages 182–186.
- Design references: https://www.sibca.com/ (solution-led corporate structure), https://kepler-elec.com/ (product and smart-home presentation), https://www.bmts.ae/markets/banks-financial-institutions/ (market-specific information and navigation).
- Controlium branding, existing hero artwork and product assets are retained. Selected product images and project photographs were extracted from the supplied PDF. Competitor text, logos and photography were not copied.
- Project descriptions are limited to the documented references. No completion dates, performance statistics or current certification claims have been invented.

## Operation
Run `npm start` inside the extracted website folder, then open the local address printed in Terminal (normally http://127.0.0.1:3000/). Press Ctrl+C to stop. The preview server uses Node.js built-ins, so `npm install` is not needed. There is no build step or third-party JavaScript dependency.
The enquiry form opens WhatsApp with a prefilled message to +971 52 762 1896. The visitor reviews and sends it in WhatsApp; this static site has no form backend. Product enquiries use the same WhatsApp number. Email and telephone links remain available.
The interactive room controls are a simulation. Their optional local browser storage is resilient to invalid or unavailable stored data.

## Verified
- All seven updated pages returned HTTP 200 in the local preview.
- Local links, anchors, image references, and one main heading per page were checked.
- Product modal indexes match all 32 catalogue entries; the JavaScript syntax check and ZIP integrity check passed.
- The new contact and catalogue layouts include responsive CSS breakpoints, but this v3 refresh has not had a full manual visual pass in every browser and screen size.

## Delivery
The ZIP includes the seven pages, their styles and image assets, plus `package.json` and `server.js` for `npm start`. It excludes the source PDF, extracted document text, backups, scratch work and unused legacy plugins.
Original versions of the three replaced files are preserved in tmp/original/ in the working project folder.

## Before public launch
For sharper project photography, replace PDF-extracted images with original high-resolution assets. The company and sales numbers and sales email shown on the site are the details supplied by the user. A hosted form service or backend is needed for direct on-site submission.

## Sensor and contact refresh, September 2026
The product page now presents 32 sensor, lighting and BMS areas. PIR motion detection leads the page; a searchable, filterable catalogue includes every sensor family provided by the user, plus vision/biometric use cases. These are offering areas, not confirmed individual SKUs. Model features, certifications, interfaces, and availability require confirmation before a specific quotation. The mmWave card describes sleep/breathing/heart-rate monitoring as model dependent and makes no medical-device claim.

The homepage includes a four-cell snapshot inspired by the supplied statistics screenshot. Only one numerical figure is used: 62 project references listed on pages 71–72 of the company prequalification document. Employee, client, partner and years-in-business counts were not supplied or verified and are omitted. The SIBCA figures, artwork and wording were not copied.

The contact design uses the user-provided LinkedIn profile, +971 52 762 1896 sales/WhatsApp number, sales@controliumbt.com, and the confirmed company number +971 76044520. No X/Twitter profile link is shown because none was supplied. The support section does not promise 24/7 service or maintenance contracts.

Six illustrative photographs were generated for PIR, air/gas, weather, water/soil, biometric access and engineering support themes and saved under `images/sensors/`. They are representative concepts, not photographs of specific Controlium models. This is stated beside the catalogue and in the footer. The original generated images remain in the Codex generated-images folder.

Technical vocabulary was checked against primary sources: [KNX PIR presence/light control](https://www.knx.org/devices/presence-sensor-constant-lighting), [Sensirion PM and environmental measurement](https://sensirion.com/products/catalog/SEN54), [TI mmWave vital-sign research](https://www.ti.com/video/5428037798001), and [Vaisala weather-station sensing](https://www.vaisala.com/sites/default/files/documents/AWS810-Datasheet-B211917EN-C.pdf). These are background references, not claims of a supplier relationship.

## Visual refresh, September 2026
The site now uses an architectural "Light & Space" direction, with a custom smart-living hero, a companion hospitality concept image, animated linework, scroll reveals, an interactive lighting-mood preview and a visible pause-motion control. Browser reduced-motion preferences are respected.

The two concept images were created with the built-in image-generation tool. They are illustrations of atmosphere, not photographs of Controlium projects or exact hardware models. Their final project files are `images/editorial/smart-living.jpg` and `images/editorial/intelligent-hospitality.jpg`.

Three larger project photos were replaced with sharper images from the official sites for [Uptown Dubai Tower](https://uptowndubai.ae/en/uptown-tower), [Vida Creek Harbour](https://www.vidahotels.com/en/hotels/vida-creek-harbour/) and [Yas Creative Hub](https://www.twofour54.com/en/yas-creative-hub/). The smaller project references retain images sourced from the supplied company PDF and are displayed at modest sizes to avoid visible upscaling. Check image reuse rights and substitute company-owned high-resolution originals before public launch if needed.

The bundled site needs no external image or script connection at runtime. New images are local files, and all new animation code is in `js/controlium-motion.js`.

## KNX Awards video
The homepage includes the user-provided KNX Association video titled “KNX Awards 2022” (https://www.youtube.com/watch?v=LRSYGVY7Pg4). It is embedded from YouTube using the privacy-enhanced iframe URL and loads when the section is reached. An ordinary YouTube link is provided as a fallback. Playback needs an internet connection and may be limited by YouTube's availability or embed settings.
