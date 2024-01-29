import { Component, OnInit, Inject } from '@angular/core';
import { CoreService } from '../../core.service';
import { base_url } from '../../core.service';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    public userData:any;
    public menuItems: any[];
    base_url:string = base_url;
    showMenu:boolean = false;
    logo_path:string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANQAAAA9CAYAAADVlUdSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABEuSURBVHhe7Z1rrB1VFcftvW1vb/ngBxM/+MEYPpBgYuILjQQMWIIIElAaeQV5tFAsUGiBFgoFimDl/bClRZtCpdBKebZAy6sgtQjlIWBqeAo2EqrW0CAEVMg4vzlnzV2z7t4z+5wz59xbs1fyT2/3Y2bP3vu/12PvmfOpXb58RBIREVEPIqEiImpEJFRERI2IhIqIqBGRUBERNSISKiKiRkRCRUTUiEioiJ7jC985yZneTXx+nxOTz3zjGGdenYiEiug5Vq/f5EzvBr5+2FnJ/IW/Sf778cfJlte2OsvUiUioiJ6jm4T60sGnJyvv25g8/eKryb8++DCx8tk9j3PWqwuRUBE9RzcIhTmHNnpuyxtN6rhl47N/ctavC5FQER2hnRW/bkLtMflspzZyyceffJLMuGSp8zp1IIhQb73991KgXm+669Fkj3SFsHWfT1cMKbfhqT8W8g6YenHhOoLXt76TPPS7F5J5192WfG7vEwp1wIsvv+WsJ3jx5TeTNRs2J1PmLkw+/bWjCnVnX77cWYdnWLr64eRbh88plK/C6vVPOq8noC13P/xUcthplxXq7XPMPGd57HzKH33WNYXy4Nrla511Xvnz21l/nZ0+m31eJpsue+7VKwr5wPYJbSP9qmX3ONN3P/C07Lk//Og/2SRlMq/d8Ixz/F2om1BfTNvTity+blPL4xyKIEKFCh18yPQFhbpbXt/azE2S7e++V8jDWawSBvIrh84q1KtS61qeeGZLYRW9dPHqZo5bcF5nLVhWuF8ZuH6oXParu/J6LCZV8tCmFwqRqVvufbyZ45fNL71WqMPfH/67MfER2it5AtsntI30vY+a20xpCAsO0bJt/3i3mVIUiLXfcRcOu75FN0w+FqFQWXjrA13TUrUSCtm2/d3CgDIptOgVdN0TzzVTywVS6Wu20nnITXdtyOtWEUpEJlUVWiEUIitjCKGQJasezO8VQiiEhUrqAN1GJr3VYrZPRBMBCCrCgnhz2pcIC89f0nHhXy1/3fbPwli5EEIoggtYKsiO994fZt1YoInpU7SntNEnXA9LYLfvTndeqxO0TCi7wmGS6U5H9IDYScADS96O9z5opibJ7CuW5+msjK+8+XYzpyFzlamC6aPFqm8GAxKKMOisrLqMBh1rB+HJP7zsLGthCaWfj4kLIbTYya7BRGTl1JOUv3eddLKzvGDyjMubpRuCSazzL11yRzOnIfRvId8QSj/DsXOub6YOycZnt+RtYvzXPvZMM6ch0+ffmNd3IYRQjPfK+zcm7yvfSLfLgr7bK32u3b936rD54ROfltrjsLMzUx03oKrvLTomFKBhWqZdsDjP8xEKM06LHWRIoSfW5pdezfMgn5ZDjZkJZv18WTO3IS6fRIPJ/8bWbc3SDXH5bxZlhAI8hxb6Q+e7cNWye5ulG1I1QQHaQgQrQedZbagXL1BGKPqF64m4CM7/tVmJBaHzLUIItc8x52daRM8B6vmCIBCqVWERdV1LKwjMXFcZH2ohFATSEkIoO8iujtK+Eh0r6YfPvLKZ2hDXhKuaRC7YlY1ruMppVBGK/2sJIdS+6WTSsnDFA85yGppQiM5jspVNeHw7LVab63Gw2k+ARhfBunCVEYQQivGC6NqKQbA80ESuOmhq2sfzhUT9fGOhSUywxVXGhxEj1H7HX9hMaYjLmbW+kpDOOst0vK1rCeUqY4GZoQVzx1VOoxuEaqdOGaGAbqfVYHaMdB6QaB5CdM/mA30NG3yyCCEU4+cjBROeCLCtg8aZct7C5GHjt/uEBdReA22rpcxEd2HECIU5pVdNBo3wrdQrq2sf2jXhLKG0D+ZD2XP4sLMQymohTFHJYxUWsdrFmuauiQzsWLnKCEIIhRtB/5cFoOh78Z/xeyDS06lrECouHwrtrOX70y4ZVqYMPSUUBNKRFcLTWr3aCcxqqEX7NJqMrggQe1BaQrTNrAU3NUs3hNXOVU5jZyEUfqaWk1Rf6wCONXHwPbVgbut8gR5nAgmuMoIQQmlgkXBfHaDQQjrXZPLr+VQlmNau+0n0maCIK78MXScUdi2DQljThmsB6UShGBA26HSedg61DwV0AIG9Lp0HLBnttV2wwYCR8qFYdbWEOMZVhMJc1pNNrmnN51OMP2o1m90TFLCoibjGQ6NVQgloqw6QiPDsaDJXnk8+Shdk1z2AaEU7liHoOqHaBZpMTwDrDOsBxHHVeXalqtrDEBBJ1BKyT2EJZfPbIdQFqVmlJSSgUkUooJ8P044FzvajjeBpcxCrQOcJIKv2d1ZUPGO7hAL0pz4sgPAsBKZakbJxkDENifJaVBLK2pSuzqibULtOmpY8+fxQ1AixzqE2MRBWTo73sImryYQ54FtVBUwsfAMtVausgNCuiCU2aJVQaEWcei3a3/EhhFBWA7PXosXlgGtz0BfhQ9tp8ZmFgk4IBSDwY2ohYLztXluVlPlGQlhXXhW8hCLUelB6U72CIS6ytEMoVkJWAgt2xzUhEHbf7Wph905cApmIJup6J827oXA/QsJ2AiNV/hOh2yUr1zdLN8Rlc/sIhVmn2wF4TiuYH/aaLvgItdv+07OFBrKwUekT7mNNciauFonw0Ye8IsGzcI5Qy0se0ml0SihAW2UznnaFhMlF/rZ9h9P9EEhfuvKq4CWUta0RTAZXQ9ohlJ1oPsEupi22Pra+TyAkE4R72HohROSsl61nYfdHIK/rfj5C2SikS1gprQnmg4tQdlxcwnMQAXWNKydetFy6pLH1YK0DEcaqyhoAdRBKcMDU+cOsmSqpur/0ZWjfa3gJpU09JguTTPaBLOomFLY6kwkTxXdkCJWthU4gOoO/Ueb7+AjFM6Ilqk5UCDB/EMjLfX1mWauE4no8OxrF198uuAjlWhQRSESImbBxmZ9go57SN9Zqoc34WiE+J6iLUJiWnMtrVap8UulL1wJZhVIfCi3AKoX558ofSTARaBsP3crEqwtELw9L0Y7j2iswbpizEJ5oHYQI8ceqwCKHKU0fsDC02gedEor7+bRkiFQtmrJY6jOpoagMSkRE1I0QQkEaOfKEFsJnY+FEc/u0EprSmuIuqfKP5Q0JFkxXfhkioSJ6jhBCYY5iemmClAUeMJOPnXNdIerqE0xZ1z0FErWsKudCJFREzxFCKIIbRFFtaN8KG/z4RGivEO2E+E6ZC7gesmTVemd+GSKhInqOEEKVRSglCGJ9HPtOm0/e2PpOoZ4Fph6C6efKL0PPCTVh8hnJuGsXZ5i4V++DCREjjxBC7ZuShXC+PqmBEJ30BVbQUuyDhUhZYEIisJicrvwy9JxQA9MvSMZsfjTD4KSpzjIR/98IIRQTXgSNxPtW+DZVEWf2juzb3i7BH/Od6BBCsdHuyi9DJFREzxFq8hGYYN+wKsxtAan42laI0BaOuun6RBKRqKEidgqEEKpTcPLjuuVrM+1WJZxXhFQEQs69+pb8hUr271zXLkMpofBxxN/xYfzcy5LBH84YXv+rRw6Vmf2zPF0TauzipYVrWQwe0Dj6MeG4OXma9rt86ePPWZCnSxrXkrQJJ5ybpw+cemGeXsAl1yQD085Pdtnj6LysQN9X2lgFXccFbz+myMukz6XTXc/pHbOrF2XlBw/8SeEaAiln70EfSN5EzwLoq+tDLwglkDOT7YjrWyVVKCUUGkQmfxWYgLb+mE0PZXn9q4dOMWtCVWHCj2Y26px60bA0MH7e5Xm61nb9t6zI0yVNP8vYdPAlnb8l3YW+dfckg/sXfy1i4PT5eX5GOpXng25rGZj4tm7fI/dleX333V1IH7vol3m9iftOydJCxgzy6uuAMRvXZ3n9d95eSNfjNTBjfiFPIPn0uyvfoleEQkvxFoF+hT9ECL+HfBjHhWBC0dFMCo1sQJ96OC8z4cezC/WZjKT3PTL07v7gwacMu44G95HrDU4+I6sz4cgz8zQGWK41bsF1efrEbw45qy5CoWkkTQ88msO2gev233PHUPlVK4euk9U5J88LXZW5rtTJVnN1v7G/uDFffIB+RsCClOWlZXS6fn7RbhP3/HHh2vk9liwtjpVamEDfmjuz9L4N9xfSJ046Ma/DeOs8geSPJkJxJK2V1+GRRbc+kAUqOjlqF0wovaprQKK8TGrC6TznxC5Daib2PbgmK58NbPp/0tEQch0mh5TPJiLp6UTJr5HCd1+uSZpd6Z1I792/elV+nYlKSzEZJX3cZdWv1gPaLXXsZAYQQvLHLi3u0OvnKZi26poDU4bMWB8oI+XHXX1DIa9srOgv0hkbmwek3mghFAen2zk0285hWIuOCQVk5etLV3Wd3iqhNDkLJmQ6ufN0ZRKJNrMaxEso0Zjpvzrdh/EXXZlfR5NAE6qsXzSqCAVywpv26edhTCS9QCij1ZzwaGlQNlbjrliY56GxbL7k+TSYRTcJRXQwJBBhBTOv7B2pUNRCKN9EbZVQrMxS3jr7ornGLv919n+caymrtVZWVsw1YyK1TCjPhO0aoQL6sSNCpZDyrRBq4MTz8jx7H0xMyQvti24RSo4MtSPtfJDFhVFDqInfPj4Z8/uGprODDfpvu7Vxj9T8wAHXNj+Dqsv6TDtfO32IhGogG5tmHv6fztNzxBWYcqEbhKoiU1W+/iGHTjBqCIVzL2VZEW0+98/yU63T9/i6xt8b1ycTJhePoUA2uY71RXzt9CGEUHX5UCCkH32EIlCi6/gg5VshVJbf1Pq2bdr309sjZaibUGXn/kTYJC47PBv6qYEqjBpC5Y4vwQjH3o+ePKA/Nf1sOBsMzLw4L2MH2NdOH0IIRRldx4e6CCWBGhByTQsp3yqhChFV5UfRL5Juo7w+1E0o+016l/DSIK/w+4TNXde1W0VXCYWmYeWUPRIfQlZ8PXBe8yYlYn/TFCRQYu/ra6cPPkIxoQZm/jQZPOS0Qri+DJ0Qir2urB9NQIDrDJx8fjJ4kHuz1gVpgyVU1VjprQLdF5iAWTr9HdgXdRNq2/YdTVoMFz5twCl03jAm6KC/lmQl5HsYVegqoUIxTsLfKXw7+Zp0vhCxjkbZsDBotZ0+QrWDTghVJ6QNllBV0MEH8aOyParm/tnYm24eVseHugnl+5Y5h2nt6/nsMfle8wj5UYYqjDihsoFqDooNf2votlhTDqdZnxogYGEDFaDVdtZJqHwlT+E7rtRJP4ZC2tAqoQDjI+1Dk/Xf3YymptqJDXtXHRfqJpT9kQek6ve92KvS3xxECLf7PgoUinBCLV6arkhTncg3Y9uYCNrnqZq0st/F5Bz8wYzGObzri6cMcJ4hmKt+qxO2LkLRHk6LZPfGR3SUAa22rx3I87RDKPYApb7uc8xfV3kfFt3WuSbQ4P0oKyG/tmI/eY10+sGfYEKFoJ2JkJ9GeHydMxihIYELJ9IBJmxbZsePBKHGpoTPo5Ipxp/p/2LpaCNUdjA29WmzMVIEErBIhAYiug37K5ohhMIc1EIU0FWuFYwooQYPOTWvO+7K6l+6YFNX3w8SEhpnkuojOT6MBKFoY3bPdPJVreSjjVB6o11A2/B5J+DHViyAvYTdZ+KEuauchZZ23n+yKCXUaAO+Bw499rrLRxqNYAVvxb8YTcBX5VAt/3JAOWTR6iUIMPBDfXwa2n5fHX/Id5SIenxK2370lFPprvKtYKciVESEgOBB2SfDfD9swNu8ZfW6GpSIiBituLL5SyIr1jS+IMuXjPSh2LJfWqScfMxSbwrjQ7X6FVyLSKiInRIEIdh/WrHmt5nvw29qQQg+0OL67VwBH17hS0qE1Rv1Vmb1+HvyjOEvXraKSKiInRLy7pJ8YIVwd4i5Jj9vJD9swOmITkPlGpFQERE1IhIqIqJGREJFRNSISKiIiBoRCRURURuOSP4HcyqdRFSutVoAAAAASUVORK5CYII=';

    constructor(
        public restApi: CoreService,
    ) {
        window.addEventListener('beforeunload', (event) => {
            this.showMenu = false;
        });
    }

    ngOnInit() {
        this.get_user();
        this.get_menu();
    }

    get_user(){
        this.restApi.getUser().subscribe((data: any) => {
            this.userData = data.data;
        });
    }

    get_menu(){
        this.restApi.getMenu().subscribe((data: any) => {
            this.menuItems = data.data;
        });
    }

    isSomePage(path) {
        path = path+'/'
        if (path == location.pathname){
            return 'active';
        } else {
            return '';
        }
    }

    navigate(path){
        this.showMenu = false;
        location.href = path;
    }

    logout(){
        this.restApi.logout().subscribe((data: any) => {
            window.location.reload();
        });
    }
}
