import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@ViewChild('content', {read: ElementRef, static:false}) elementView: ElementRef;
    SavePDF(save_server = false) {
        let DATA: any = document.getElementById('htmlData');
        html2canvas(DATA, { allowTaint: true }).then(canvas => {
            const imgWidth = 208;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
            heightLeft -= pageHeight;
            const doc = new jsPDF('p', 'mm');
            doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'SLOW');
            while (heightLeft >= 0){
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'SLOW');
                heightLeft -= pageHeight;
            }
            
            if(save_server){
                this.blob = doc.output('blob');
            }else{
                doc.save('vada-'+this.dataTable.initData.VDMSVD+'.pdf');
                return;
            }
            // doc.save('vada-'+this.dataTable.initData.VDMSVD+'.pdf');

        });
      }


      itemHeight(event){
        if(event.offsetHeight > 230){
            return 460;
        }
        return;
    }

    getPdfLine(index, lenght, event){
        // console.log((event.offsetTop+230));
        // console.log(Math.floor((event.offsetTop)/1418));
        // console.log('1: '+Math.floor((event.offsetTop)/1418));
        // console.log('2: '+Math.floor((event.offsetTop+460)/1418));
        if(lenght > 500 && Math.floor((event.offsetTop)/1418) != Math.floor((event.offsetTop+460)/1418)  ){
            this.pdfline = Math.floor((event.offsetTop+230)/1418);
            return 'margin-top: 268px';
        }
        if(this.pdfline != Math.floor((event.offsetTop+230)/1418)){
            this.pdfline = Math.floor((event.offsetTop+230)/1418);
            return 'margin-top: 38px';

        }
        return  'margin-top: 0px';
    }