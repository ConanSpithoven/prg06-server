import createPagination from "./pageHandler.js";

export function LinkAdder(results){
    for (var result of results){
      result['_links'] = {'self' : {'href' : '/bosses/' + result._id}};
    }
    return results;
}
  
export function ListDataBuilder(results, total = 0, start = 0, limit = 0) {
    results = LinkAdder(results);
    let pagination = createPagination(total, start, limit);
    let data = {
        'items' : results,
        '_links' : {'self' : {'href' : '/bosses'}},
        'pagination' : pagination
    };
    return data;
}
  
export function IDDataBuilder(result) {
    let data = {
        'item' : result,
        '_links' : {'self' : {'href' : '/bosses/' + result._id}, 'collection' : {'href' : '/bosses'}},
    };
    return data;
}