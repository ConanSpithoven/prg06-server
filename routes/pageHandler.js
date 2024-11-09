import "../loadEnvironment.mjs";

function currentItems(total, start, limit){
    if((start == 1 || start === undefined) && (limit == 0 || limit === undefined)){
        return total;
    } else if (limit == 0 || limit === undefined){
        return Math.max(total - start, 1);
    } else if (start >=  lastPageItem(total, start, limit)){
        if(total == limit) return total;
        else return (total % limit);
    } else {
        return parseInt(limit);
    }
}

function numberOfPages(total, start, limit){
    if(limit == 0 || limit === undefined) return 1;
    else return Math.ceil(total / limit);
}

function currentPage(total, start, limit){
    if((limit == 0 || limit === undefined) || start <= limit) return 1;
    else return Math.ceil(((start - 1) / limit) + 1);
}

function firstPageItem(total, start, limit){
    return 1;
}

function lastPageItem(total, start, limit){
    return (((numberOfPages(total, start, limit) - 1) * limit) + 1);
}

function previousPageItem(total, start, limit){
    return (Math.max((currentPage(total, start, limit) - 2) * limit + 1), 1);
}

function nextPageItem(total, start, limit){
    return (Math.min((currentPage(total, start, limit)) * limit + 1));
}

function getFirstQueryString(total, start, limit){
    if(!(limit == 0 || limit === undefined))
        return "?start=1&limit=" + limit;
    else
        return "";
}

function getLastQueryString(total, start, limit){
    if(!((start == 1 || start === undefined) && (limit == 0 || limit === undefined)))
        return "?start=" + lastPageItem(total, start, limit) + "&limit=" + limit;
    else
        return "";
}

function getPreviousQueryString(total, start, limit){
    if(!((start == 1 || start === undefined) && (limit == 0 || limit === undefined)))
        return "?start=" + previousPageItem(total, start, limit) + "&limit=" + limit;
    else
        return "";
}

function getNextQueryString(total, start, limit){
    if(!((start == 1 || start === undefined) && (limit == 0 || limit === undefined)))
        return "?start=" + nextPageItem(total, start, limit) + "&limit=" + limit;
    else
        return "";
}

function itemToPageNumber(total, start, limit, itemNumber){
    let page;
    if(limit != 0){
        page =  Math.ceil(((itemNumber - 1) / limit) + 1);
        if(page == 0) {
            return 1;
        } else {
            return page;
        }
    }else
        return 1;
}

export default function createPagination(total, start, limit){
    let CurrentPage = currentPage(total, start, limit);
    let CurrentItems = currentItems(total, start, limit);
    let totalPages = numberOfPages(total, start, limit);
    let totalItems = total;
    let firstQuery = getFirstQueryString(total, start, limit);
    let lastQuery = getLastQueryString(total, start, limit);
    let lastPage = itemToPageNumber(total, start, limit, total);
    let previousPage = Math.max(CurrentPage - 1, 1);
    let previousQuery = getPreviousQueryString(total, start, limit);
    let nextPage = Math.max(CurrentPage + 1, lastPage);
    let nextQuery = getNextQueryString(total, start, limit);

    let data = {
        "currentPage" : CurrentPage,
        'currentItems' : CurrentItems,
        'totalPages' : totalPages,
        'totalItems' : totalItems,
        'link' : {
            'first' : {
                'page' : 1,
                'href' : process.env.HOST + '/bosses' + firstQuery
            },
            'last' : {
                'page' : lastPage,
                'href' : process.env.HOST + '/bosses' + lastQuery
            },
            'previous' : {
                'page' : previousPage,
                'href' : process.env.HOST + '/bosses' + previousQuery
            },
            'next' : {
                'page' : nextPage,
                'href' : process.env.HOST + '/bosses' + nextQuery
            },
        }
    }
    return data;
}