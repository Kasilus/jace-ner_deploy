let extractSentences = require("sentence-extractor").extractSentences

function iterate(item, named_entities) {
    if (item.type == 'word' && named_entities.length > 0 && item.value == named_entities[0].entity) {
      const named_entity = named_entities.shift();
      item.type = `named entity (${named_entity.tag})`;
    }

    Array.isArray(item.childs) && item.childs.forEach(item => iterate(item, named_entities));
}

module.exports = (text, named_entities) => {
  return extractSentences(text)
      .then( res => {
          let res_json = [res];
          res_json.forEach(item => iterate(item, named_entities));
          return res_json;
      })
      .catch( e => {
          console.error(e.toString())
      });
}
