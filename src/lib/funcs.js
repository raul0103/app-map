export function getDateRoute(date) {
    let dateObject = {}
    dateObject.dd = date.getDate();

    if (dateObject.dd < 10) dateObject.dd = '0' + dateObject.dd;
    dateObject.mm = date.getMonth() + 1;
    if (dateObject.mm < 10) dateObject.mm = '0' + dateObject.mm;
    dateObject.yy = date.getFullYear() % 100;
    if (dateObject.yy < 10) dateObject.yy = '0' + dateObject.yy;
    dateObject.hh = date.getHours();
    if (dateObject.hh < 10) dateObject.hh = '0' + dateObject.hh;
    dateObject.minutes = date.getMinutes();
    if (dateObject.minutes < 10) dateObject.minutes = '0' + dateObject.minutes;

    return dateObject
}

export const btnDelete = {
    point_all: () => {
        //Делаем кнопку удалить активной
        document.querySelectorAll('.btn-delete-route').forEach(btn => {
            btn.classList.remove('point-none')
        })
    },
    point_none: () => {
        //Делаем кнопку удалить не активной, что бы события перетаскивания не касались ее
        document.querySelectorAll('.btn-delete-route').forEach(btn => {
            btn.classList.add('point-none')
        })
    }
}