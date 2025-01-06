import "../loadEnvironment.mjs";

function currentItems(total, page, limit){
    if((page == 1 || page === undefined) && (limit == 0 || limit === undefined)){
        return total;
    } else if (limit == 0 || limit === undefined){
        return Math.max(total - page, 1);
    } else if (page >=  lastPageItem(total, page, limit)){
        if(total == limit) return total;
        else return (total % limit);
    } else {
        return parseInt(limit);
    }
}

function numberOfPages(total, page, limit){
    if(limit == 0 || limit === undefined) return 1;
    else return Math.ceil(total / limit);
}

function currentPage(total, page, limit){
    if((limit == 0 || limit === undefined) || page <= limit) return 1;
    else return Math.ceil(((page - 1) / limit) + 1);
}

function firstPageItem(total, page, limit){
    return 1;
}

function lastPageItem(total, page, limit){
    return (((numberOfPages(total, page, limit) - 1) * limit) + 1);
}

function previousPageItem(total, page, limit){
    return (Math.max((currentPage(total, page, limit) - 2) * limit + 1), 1);
}

function nextPageItem(total, page, limit){
    return (Math.min((currentPage(total, page, limit)) * limit + 1));
}

function getFirstQueryString(total, page, limit){
    if(!(limit == 0 || limit === undefined))
        return "?page=1&limit=" + limit;
    else
        return "";
}

function getLastQueryString(total, page, limit){
    if(!((page == 1 || page === undefined) && (limit == 0 || limit === undefined)))
        return "?page=" + lastPageItem(total, page, limit) + "&limit=" + limit;
    else
        return "";
}

function getPreviousQueryString(total, page, limit){
    if(!((page == 1 || page === undefined) && (limit == 0 || limit === undefined)))
        return "?page=" + previousPageItem(total, page, limit) + "&limit=" + limit;
    else
        return "";
}

function getNextQueryString(total, page, limit){
    if(!((page == 1 || page === undefined) && (limit == 0 || limit === undefined)))
        return "?page=" + nextPageItem(total, page, limit) + "&limit=" + limit;
    else
        return "";
}

function itemToPageNumber(total, page, limit, itemNumber){
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

export default function createPagination(total, page, limit){
    let CurrentPage = currentPage(total, page, limit);
    let CurrentItems = currentItems(total, page, limit);
    let totalPages = numberOfPages(total, page, limit);
    let totalItems = total;
    let firstQuery = getFirstQueryString(total, page, limit);
    let lastQuery = getLastQueryString(total, page, limit);
    let lastPage = itemToPageNumber(total, page, limit, total);
    let previousPage = Math.max(CurrentPage - 1, 1);
    let previousQuery = getPreviousQueryString(total, page, limit);
    let nextPage = Math.min(CurrentPage + 1, lastPage);
    let nextQuery = getNextQueryString(total, page, limit);

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