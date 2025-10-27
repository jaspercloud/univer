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
const s = {
    id: 'workbook',
    name: 'UniverSheet',
    sheets: [
        {
            id: '0',
            name: 'test',
            rowCount: 32,
            columnCount: 3,
            hidden: 0,
            cellData: {
                0: {
                    0: { s: '2', v: 'test1', t: 1 },
                    1: { s: '2', v: 'test2', t: 1 },
                    2: { s: '1', v: 's', t: 1 },
                },
            },
        },
    ],
};
document.querySelector('#btn').onclick = () => {
    api.update(s);
};
