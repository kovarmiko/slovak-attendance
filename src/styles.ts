export const styles = `
    body { font-family: sans-serif; padding: 20px; }
    h1 { text-align: center; }
    .controls { text-align: center; margin-bottom: 10px; }
    .user-info { margin-bottom: 10px; }
    .period { margin-bottom: 20px; }
    .period label { font-weight: normal; margin-right: 5px; }
    .period span, #printName { font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: center; }
    th { background: #f0f0f0; }
    .day-name { background: #ffff99; }
    .weekend td, tr > td:first-child { background: #ffff99; }
    #summary { margin-top: 20px; font-weight: bold; text-align: right; }
    #summary span { margin-right: 5px; }

    /* Mobile optimization */
    @media (max-width: 600px) {
      body { padding: 10px; }
      table { display: block; overflow-x: auto; }
      th, td { font-size: 14px; padding: 4px; }
    }

    /* PRINT OPTIMIZATION FOR A4 */
    @media print {
      html, body {
        width: 200mm;
        height: 297mm;
        margin: 0 !important;
        padding: 0 !important;
        font-size: 11px !important;
        background: white !important;
      }
      @page {
        size: A4 portrait;
        margin: 10mm 8mm 10mm 8mm;
      }
      h1 {
        font-size: 18px !important;
        margin: 0 0 6px 0 !important;
      }
      .user-info, .period {
        margin-bottom: 6px !important;
      }
      .period label, .user-info label {
        font-size: 11px !important;
      }
      .period span, #printName {
        font-size: 12px !important;
      }
      table {
        font-size: 10px !important;
        margin-top: 4px !important;
        table-layout: fixed;
        width: 100% !important;
        page-break-inside: avoid !important;
      }
      th, td {
        padding: 2px 3px !important;
        border-width: 1px !important;
        word-break: break-word;
        max-width: 60px;
      }
      th {
        font-size: 10px !important;
      }
      .day-name, .weekend td, tr > td:first-child {
        background: #ffff99 !important;
      }
      .vacation, .controls, .shift-toggle, #firstName, #lastName, .vacationChk {
        display: none !important;
      }
      #summary {
        margin-top: 8px !important;
        font-size: 11px !important;
        text-align: right !important;
      }
      /* Remove all box-shadows, extra borders, and colors for print clarity */
      * {
        box-shadow: none !important;
        text-shadow: none !important;
        background-image: none !important;
      }
      /* Prevent table from splitting across pages */
      tr, thead, tbody, table {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      /* Remove any page breaks */
      .page-break, .break { display: none !important; }

      /* Remove select arrow in print */
      select {
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important;
      }
    }

  `;