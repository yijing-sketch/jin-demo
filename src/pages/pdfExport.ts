import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportPDF(elementRef: React.RefObject<HTMLDivElement | null>) {
  const element = elementRef.current
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#f0f4f8',
    })

    const imgData = canvas.toDataURL('image/png')
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    const pdf = new jsPDF('p', 'mm', 'a4')
    let heightLeft = imgHeight
    let position = 0

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add additional pages if content overflows
    while (heightLeft > 0) {
      position = position - pageHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(`AI就绪度评估报告_${new Date().toISOString().slice(0, 10)}.pdf`)
  } catch (error) {
    console.error('PDF导出失败:', error)
    alert('PDF导出失败，请重试')
  }
}
