/**
 * Copyright 2023-present DreamNum Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createInstance } from './lib';

const api = createInstance('excel');
const workbook = {
    id: 'workbook',
    name: 'UniverSheet',
    sheets: { 0: { id: '0', name: '用户信息', rowCount: 32, columnCount: 6, hidden: 0, cellData: { 0: { 0: { s: '3', v: '导入模版说明：需要导入的数据从第3行开始，蓝色为必填唯一，黄色为必填。', t: 1 }, 1: { s: '3', v: '', t: 0 }, 2: { s: '3', v: '', t: 0 }, 3: { s: '3', v: '', t: 0 }, 4: { s: '3', v: '', t: 0 }, 5: { s: '3', v: '', t: 0 } }, 1: { 0: { s: '4', v: '姓名', t: 1 }, 1: { s: '4', v: '性别', t: 1 }, 2: { s: '5', v: '手机号', t: 1 }, 3: { s: '4', v: '岗位', t: 1 }, 4: { s: '4', v: '是否启用', t: 1 }, 5: { s: '6', v: '结果', t: 1 } } }, rowData: { 0: { h: 107 }, 1: { h: 28 } }, columnData: { 0: { w: 125 }, 1: { w: 129 }, 2: { w: 166 }, 3: { w: 150 }, 4: { w: 113 }, 5: { w: 126 } }, mergeData: [{ rangeType: 0, startRow: 0, endRow: 0, startColumn: 0, endColumn: 5 }] }, 1: { id: '1', name: '性别', rowCount: 32, columnCount: 1, hidden: 1, cellData: { 0: { 0: { s: '0', v: '男', t: 1 } }, 1: { 0: { s: '0', v: '女', t: 1 } } }, rowData: { 0: {}, 1: {} }, columnData: {}, mergeData: [] }, 2: { id: '2', name: '岗位', rowCount: 36, columnCount: 1, hidden: 1, cellData: { 0: { 0: { s: '0', v: '工程师', t: 1 } }, 1: { 0: { s: '0', v: '产品', t: 1 } }, 2: { 0: { s: '0', v: '数据分析', t: 1 } }, 3: { 0: { s: '0', v: '运营', t: 1 } }, 4: { 0: { s: '0', v: '财务', t: 1 } }, 5: { 0: { s: '0', v: '运维', t: 1 } } }, rowData: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} }, columnData: {}, mergeData: [] } },
    styles: { 0: { bl: 0, it: 0, cl: { rgb: '#000000' }, ht: 1, vt: 2, tb: 0 }, 1: { cl: { rgb: '#000000' } }, 3: { bl: 0, it: 0, cl: { rgb: '#000000' }, bg: { rgb: '#E54C5E' }, ht: 1, vt: 2, tb: 3 }, 4: { bl: 0, it: 0, cl: { rgb: '#000000' }, bg: { rgb: '#FFFF00' }, bd: { l: { s: 1 }, r: { s: 1 }, t: { s: 1 }, b: { s: 1 } }, ht: 2, vt: 2, tb: 0 }, 5: { bl: 0, it: 0, cl: { rgb: '#000000' }, bg: { rgb: '#4874CB' }, bd: { l: { s: 1 }, r: { s: 1 }, t: { s: 1 }, b: { s: 1 } }, ht: 2, vt: 2, tb: 0 }, 6: { bl: 0, it: 0, cl: { rgb: '#000000' }, bd: { l: { s: 1 }, r: { s: 1 }, t: { s: 1 }, b: { s: 1 } }, ht: 2, vt: 2, tb: 0 } },
    protectionRanges: { 0: [{ range: '1:1', locked: true }, { range: '2:2', locked: true }] },
    components: { 0: [{ uid: '0', type: 'list', formula1: '=性别!$A:$A', ranges: [{ rangeType: 0, startRow: 2, endRow: 65534, startColumn: 1, endColumn: 1 }] }, { uid: '1', type: 'list', formula1: '=岗位!$A:$A', ranges: [{ rangeType: 0, startRow: 2, endRow: 65534, startColumn: 3, endColumn: 3 }] }, { uid: '2', type: 'checkbox', ranges: [{ rangeType: 0, startRow: 2, endRow: 65534, startColumn: 4, endColumn: 4 }] }] },
};
api.update(workbook);
document.querySelector('#snapshot').onclick = () => {
    const data = api.snapshot();
    console.log(data);
    api.update(data);
};
