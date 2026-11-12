// Zero-dependency PDF text extractor (Loads PDF.js dynamically from CDN)
export async function extractTextFromPDF(file) {
  // Dynamically load pdf.js in the browser if not already loaded
  if (!window.pdfjsLib) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
      script.onload = resolve
      script.onerror = () => reject(new Error('Failed to load PDF engine'))
      document.head.appendChild(script)
    })
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
  }

  const arrayBuffer = await file.arrayBuffer()
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let fullText = ''

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum)
    const textContent = await page.getTextContent()

    let lastY = null
    let pageLines = ''
    for (const item of textContent.items) {
      if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
        pageLines += '\n'
      } else if (lastY !== null) {
        pageLines += ' '
      }
      pageLines += item.str
      lastY = item.transform[5]
    }
    fullText += pageLines + '\n\n'
  }

  return fullText.trim()
}