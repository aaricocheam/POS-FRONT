import { Category } from 'src/app/response/category/category.response';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import icCategory from "@iconify/icons-ic/twotone-category"
import { ListTableMenu } from '../../../commons/list-table-menu.interface';
import icViewHeadLine from "@iconify/icons-ic/twotone-view-headline";
import icLabel from "@iconify/icons-ic/twotone-label";
import icCalendarMonth from "@iconify/icons-ic/twotone-calendar-today";
import { GenericValidators } from '@shared/validators/generic-validators';

const searchOptions = [
    {
        label: "Nombre",
        value: 1,
        placeholder: "Buscar por nombre",
        validation: [GenericValidators.defaultName],
        validation_desc: "Solo se permite letras en esta búsqueda.",
        min_len: 2
    },
    {
        label: "Descripción",
        value: 2,
        placeholder: "Buscar por descripción",
        validation: [GenericValidators.defaultDescription],
        validation_desc: "Solo se permite letras y números en esta búsqueda.",
        min_len: 2
    }
]

const menuItems: ListTableMenu[] = [
    {
        type: "link",
        id: "all",
        icon: icViewHeadLine,
        label: "Todos"
    },
    {
        type: "link",
        id: "Activo",
        value: 1,
        icon: icLabel,
        label: "Activo",
        classes: {
            icon: "text-green"
        }
    },
    {
        type: "link",
        id: "Inactivo",
        value: 0,
        icon: icLabel,
        label: "Inactivo",
        classes: {
            icon: "text-gray"
        }
    }
]

const tableColumns: TableColumn<Category>[] = [
    {
        label: "Nombre",
        property: "name",
        type: "text",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "Descripción",
        property: "description",
        type: "textTruncate",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "F. Creación",
        property: "auditCreateDate",
        type: "datetime",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "Estado",
        property: "stateCategory",
        type: "text",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "",
        property: "menu",
        type: "buttonGroup",
        buttonItems: [
            {
                buttonLabel: "EDITAR",
                buttonAction: "edit",
                buttonCondition: null,
                disable: false
            },
            {
                buttonLabel: "ELIMNAR",
                buttonAction: "remove",
                buttonCondition: null,
                disable: false
            }
        ],
        cssClasses: ['font-medium', 'w-10']
    }
]

const filters = {
    numFilter: 0,
    textFilter: "",
    stateFilter: null,
    startDate: null,
    endDate: null
}

const inputs = {
    numFilter: 0,
    textFilter: "",
    stateFilter: null,
    startDate: null,
    endDate: null
}

export const componentSetting = {
    //ICONS
    icCategory: icCategory,
    icCalendarMonth: icCalendarMonth,
    //LAYOUT SETTINGS
    menuOpen: false,
    //TABLE SETTINGS
    tableColumns: tableColumns,
    initialSort: "Id",
    initialSortDir: "desc",
    getInputs: inputs,
    buttonLabel: "EDITAR",
    buttonLabel2: "ELIMINAR",
    //SEARCH FILTROS
    menuItems: menuItems,
    searchOptions: searchOptions,
    filters_dates_active: false,
    filters: filters,
    datesFilterArray: ['Fecha de creación'],
    columnsFilter: tableColumns.map((colum) => { return { label: colum.label, property: colum.property, type: colum.type } })
}