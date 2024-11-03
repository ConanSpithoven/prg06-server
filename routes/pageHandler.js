function currentItems(total, start, limit){
    console.log("total: " + total);
    console.log("start: " + start);
    console.log("limit: " + limit);
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
    return ((currentPage(total, start, limit) - 2) * limit + 1);
}

function nextPageItem(total, start, limit){
    return ((currentPage(total, start, limit)) * limit + 1);
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
    if(limit != 0)
        return Math.ceil(((itemNumber - 1) / limit) + 1);
    else
        return 0;
}

export default function createPagination(total, start, limit){
    let CurrentPage = currentPage(total, start, limit);
    let CurrentItems = currentItems(total, start, limit);
    let totalPages = numberOfPages(total, start, limit);
    let totalItems = total;
    let firstQuery = getFirstQueryString(total, start, limit);
    let lastQuery = getLastQueryString(total, start, limit);
    let lastPage = itemToPageNumber(total, start, limit, total);
    let previousPage = CurrentPage - 1;
    let previousQuery = getPreviousQueryString(total, start, limit);
    let nextPage = CurrentPage + 1;
    let nextQuery = getNextQueryString(total, start, limit);

    let data = {
        "currentPage" : CurrentPage,
        'currentItems' : CurrentItems,
        'totalPages' : totalPages,
        'totalItems' : totalItems,
        'link' : {
            'first' : {
                'page' : 1,
                'href' : '/bosses/' + firstQuery
            },
            'last' : {
                'page' : lastPage,
                'href' : '/bosses/' + lastQuery
            },
            'previous' : {
                'page' : previousPage,
                'href' : '/bosses/' + previousQuery
            },
            'next' : {
                'page' : nextPage,
                'href' : '/bosses/' + nextQuery
            },
        }
    }
console.log(data);
    return data;
}