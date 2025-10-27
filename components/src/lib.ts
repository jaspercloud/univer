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

import { LocaleType, mergeLocales, Univer, UniverInstanceType } from '@univerjs/core';
import { FUniver } from '@univerjs/core/facade';
import DesignZhCN from '@univerjs/design/locale/zh-CN';
import { UniverDocsPlugin } from '@univerjs/docs';
import { UniverDocsUIPlugin } from '@univerjs/docs-ui';
import DocsUIZhCN from '@univerjs/docs-ui/locale/zh-CN';
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula';
import { UniverRenderEnginePlugin } from '@univerjs/engine-render';
import { UniverSheetsPlugin } from '@univerjs/sheets';
import { UniverSheetsFormulaUIPlugin } from '@univerjs/sheets-formula-ui';
import SheetsFormulaUIZhCN from '@univerjs/sheets-formula-ui/locale/zh-CN';
import { UniverSheetsNumfmtUIPlugin } from '@univerjs/sheets-numfmt-ui';
import SheetsNumfmtUIZhCN from '@univerjs/sheets-numfmt-ui/locale/zh-CN';
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui';
import SheetsUIZhCN from '@univerjs/sheets-ui/locale/zh-CN';
import SheetsZhCN from '@univerjs/sheets/locale/zh-CN';
import { UniverUIPlugin } from '@univerjs/ui';
import UIZhCN from '@univerjs/ui/locale/zh-CN';

import '@univerjs/sheets/facade';
import '@univerjs/ui/facade';
import '@univerjs/docs-ui/facade';
import '@univerjs/sheets-ui/facade';
import '@univerjs/engine-formula/facade';
import '@univerjs/sheets-formula/facade';
import '@univerjs/sheets-numfmt/facade';
import '@univerjs/sheets-drawing-ui/facade';

import './global.css';

const createInstance = (container: string) => {
    const univer = new Univer({
        locale: LocaleType.ZH_CN,
        locales: {
            [LocaleType.ZH_CN]: mergeLocales(
                DesignZhCN,
                UIZhCN,
                DocsUIZhCN,
                SheetsZhCN,
                SheetsUIZhCN,
                SheetsFormulaUIZhCN,
                SheetsNumfmtUIZhCN
            ),
        },
    });
    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);
    univer.registerPlugin(UniverUIPlugin, {
        container,
        header: false,
        // footer: false,
    });
    univer.registerPlugin(UniverDocsPlugin);
    univer.registerPlugin(UniverDocsUIPlugin);
    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsUIPlugin);
    univer.registerPlugin(UniverSheetsFormulaUIPlugin);
    univer.registerPlugin(UniverSheetsNumfmtUIPlugin);

    const workbook = {
        unitId: null,
    };
    const WORKBOOK_DATA = {
        id: 'workbook',
        name: 'UniverSheet',
        locale: LocaleType.ZH_CN,
        sheets: [],
    };
    workbook.unitId = univer.createUnit(UniverInstanceType.UNIVER_SHEET, WORKBOOK_DATA).getUnitId();
    const univerAPI = FUniver.newAPI(univer);

    function update(data: any) {
        if (workbook.unitId) {
            univerAPI.disposeUnit(workbook.unitId);
        }
        workbook.unitId = univer.createUnit(UniverInstanceType.UNIVER_SHEET, data).getUnitId();
    }

    return {
        update,
    };
};

export {
    createInstance,
};
