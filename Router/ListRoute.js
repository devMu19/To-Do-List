const express = require('express');
const Listop = require('../operation/ListOperation');

const ListRouter = express.Router();

ListRouter.route('/myList')
.get(Listop.myList);

ListRouter.route('/show')
.get(Listop.show);

ListRouter.route('/search')
.post(Listop.search);


ListRouter.route('/:path')
.get(Listop.NoFindinSearch);


ListRouter.route('/innerItem')
.post(Listop.innerItem);


ListRouter.route('/deleteAll')
.post(Listop.deleteAll);

ListRouter.route('/delete')
.post(Listop.delete);


module.exports = ListRouter;