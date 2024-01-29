#Core Index

##Button
```
<lib-button class="" bclass="h-full w-full" icon="add" label="שם הכפתור" size="lg" (click)=""></lib-button>
<lib-button class="" bclass="h-full w-full" icon="add" label="שם הכפתור" size="sm" (click)=""></lib-button>
```

##SVG Icons
```
<lib-svg svg="bg_tag_green"></lib-svg> 1
```

##Table
Front
```
<lib-table [dataTable]="dataTable" (onRowClick)="rowClick($event)" (onActionsClick)="actionClick($event)">
    <ng-template #mainButtons>
        <lib-button class="mr-3" bclass="rounded" icon="plus-in-circ-filled" label="הוסף נתונים" size="sm"></lib-button>
    </ng-template>
    <ng-template #actions>
        <lib-button icon="delete" label="מחק" bclass="surface-500"></lib-button>
    </ng-template>
</lib-table>
```

Server:
```
{
    "cols": [
        {
            "HEADER": "שנה", //display in table
            "FIELD": "YMYEAR", //get from DB
            "TYPE": "NUM", //display type DEC/HIDE/NUM/STRING
            "GROUPDIVIDER": 0, //divider double
            "DIVIDER": 0, //divider
            "BG": "green", //background cell class
            "BG_CONDITION": [
                "VALUE": "1",
                "CLASS": "green"
            ],
            "CLASS": "green", //class of the content cell
            "CLASS_CONDITION": [
                "VALUE": "1",
                "CLASS": "green"
            ],
        }
    ],
    "data": [
        {
            "YMYEAR": "2023",...
        }
    ],
    "totalrows": 1,
    "buttons": [
        {
            "icon": "plus-in-circ-filled",
            "label": "בחירה",
            "route": "/pkuda",
            "params": [
                "YMYEAR",
                "YMPKDA"
            ]
        }
    ],
    "menu": [
        {
            "icon": "pi pi-check",
            "label": "תפריט נפתח בכל שורה",
            "route": "/pkuda",
            "params": [
                "YMYEAR",
                "YMPKDA"
            ]
        }
    ]
}
```

##Style
.color-primary
.color-secondary
.color-white
.bg-white
.bg-secondary

##Dev Install
```
#Start Work
Azure Link = https://dev.azure.com/JerusalemMuni/Kaspit
git clone ..
git checkout ...new branch
npm install

#Serve:
ng serve matash --serve-path=matash
ng g c components/button --project=core --skip-tests=true --export
ng g c shared/dialogs/pkudaUpload --project=matash --skip-tests=true --export
git add . && git commit -m 'add files' && git push

ng serve matash --serve-path=matash
ng build dashboard --watch

#Build Test:
ng build --base-href signatures

#Build Prod:
ng build core --configuration=production
ng build matash --output-path=prod/matash --base-href='http://jer400:10100/yam/matash/' --configuration=production --aot

#Library Build / Link:
cd prod
npm link core
```