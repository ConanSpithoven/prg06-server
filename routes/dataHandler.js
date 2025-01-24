import createPagination from "./pageHandler.js";
import "../loadEnvironment.mjs";

export function LinkAdder(results){
    for (var result of results){
      result['_links'] = {'self' : {'href' : process.env.HOST + '/bosses/' + result._id}};
    }
    return results;
}
  
export function ListDataBuilder(results, total = 0, start = 1, limit = 0) {
    results = LinkAdder(results);
    let pagination = createPagination(total, start, limit);
    let data = {
        'items' : results,
        '_links' : {'self' : {'href' : process.env.HOST + '/bosses'}},
        'pagination' : pagination
    };
    return data;
}
  
export function IDDataBuilder(result) {
    let data = {
        'item' : result,
        '_links' : {'self' : {'href' : process.env.HOST + '/bosses/' + result._id}, 'collection' : {'href' : process.env.HOST + '/bosses'}},
    };
    return data;
}

const fields = {
    name: 'string',
    weaknesses: 'string',
    strengths: 'string',
    damageType: 'string',
    type: 'string',
    special: 'string'
};

export function PostFieldChecker(body) {
    for (let attribute in fields) {
        if (typeof checkBody[attribute] !== fields[attribute] || checkBody[attribute] == "") {
            return false;
        }
    }
    return true;
}