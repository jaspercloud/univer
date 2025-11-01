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

import type { IWorkbookData } from '@univerjs/core';
import { LocaleType, mergeLocales, Univer, UniverInstanceType } from '@univerjs/core';
import { FUniver } from '@univerjs/core/facade';
import DesignZhCN from '@univerjs/design/locale/zh-CN';
import { UniverDocsPlugin } from '@univerjs/docs';
import { UniverDocsUIPlugin } from '@univerjs/docs-ui';
import DocsUIZhCN from '@univerjs/docs-ui/locale/zh-CN';
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula';
import { UniverRenderEnginePlugin } from '@univerjs/engine-render';
import FindReplaceZhCN from '@univerjs/find-replace/locale/zh-CN';
import { UniverSheetsPlugin } from '@univerjs/sheets';
import { UniverSheetsDataValidationPlugin } from '@univerjs/sheets-data-validation';
import { UniverSheetsDataValidationUIPlugin } from '@univerjs/sheets-data-validation-ui';
import SheetsDataValidationUIZhCN from '@univerjs/sheets-data-validation-ui/locale/zh-CN';
import { UniverSheetsFilterUIPlugin } from '@univerjs/sheets-filter-ui';
import SheetsFilterUIZhCN from '@univerjs/sheets-filter-ui/locale/zh-CN';
import { UniverSheetsFindReplacePlugin } from '@univerjs/sheets-find-replace';
import SheetsFindReplaceZhCN from '@univerjs/sheets-find-replace/locale/zh-CN';
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula';
import { UniverSheetsFormulaUIPlugin } from '@univerjs/sheets-formula-ui';
import SheetsFormulaUIZhCN from '@univerjs/sheets-formula-ui/locale/zh-CN';
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt';
import { UniverSheetsNumfmtUIPlugin } from '@univerjs/sheets-numfmt-ui';
import SheetsNumfmtUIZhCN from '@univerjs/sheets-numfmt-ui/locale/zh-CN';
import { UniverSheetsSortUIPlugin } from '@univerjs/sheets-sort-ui';
import SheetsSortUIZhCN from '@univerjs/sheets-sort-ui/locale/zh-CN';
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui';
import SheetsUIZhCN from '@univerjs/sheets-ui/locale/zh-CN';
import SheetsZhCN from '@univerjs/sheets/locale/zh-CN';
import { UniverUIPlugin } from '@univerjs/ui';
import UIZhCN from '@univerjs/ui/locale/zh-CN';

import '@univerjs/docs-ui/facade';
import '@univerjs/engine-formula/facade';
import '@univerjs/sheets-data-validation/facade';
import '@univerjs/sheets-formula-ui/facade';
import '@univerjs/sheets-formula/facade';
import '@univerjs/sheets-numfmt/facade';
import '@univerjs/sheets-table/facade';
import '@univerjs/sheets-ui/facade';
import '@univerjs/sheets/facade';
import '@univerjs/ui/facade';

import './global.css';

const createInstance = (container: string, header?: boolean = false) => {
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
                SheetsNumfmtUIZhCN,
                SheetsDataValidationUIZhCN,
                SheetsFilterUIZhCN,
                SheetsSortUIZhCN,
                FindReplaceZhCN,
                SheetsFindReplaceZhCN
            ),
        },
    });
    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);
    univer.registerPlugin(UniverUIPlugin, {
        container,
        header,
    });
    univer.registerPlugin(UniverDocsPlugin);
    univer.registerPlugin(UniverDocsUIPlugin);
    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsUIPlugin, {
        disableForceStringAlert: true,
    });
    univer.registerPlugin(UniverSheetsFormulaPlugin);
    univer.registerPlugin(UniverSheetsFormulaUIPlugin);
    univer.registerPlugin(UniverSheetsNumfmtPlugin, {
        disableTextFormatAlert: true,
    });
    univer.registerPlugin(UniverSheetsNumfmtUIPlugin);
    univer.registerPlugin(UniverSheetsFilterUIPlugin);
    univer.registerPlugin(UniverSheetsSortUIPlugin);
    univer.registerPlugin(UniverSheetsFindReplacePlugin);
    univer.registerPlugin(UniverSheetsDataValidationPlugin);
    univer.registerPlugin(UniverSheetsDataValidationUIPlugin);

    const uni = {
        unitId: null,
    };
    const WORKBOOK_DATA: Partial<IWorkbookData> = {};
    uni.unitId = univer.createUnit(UniverInstanceType.UNIVER_SHEET, WORKBOOK_DATA).getUnitId();
    const univerAPI = FUniver.newAPI(univer);

    function update(data: any) {
        if (uni.unitId) {
            univerAPI.disposeUnit(uni.unitId);
        }
        data.resources = [];
        if (data.components) {
            const components = {};
            for (const sheetId in Object.keys(data.components)) {
                const sheetComponents = data.components[sheetId];
                components[sheetId] = sheetComponents;
            }
            data.resources.push({
                name: 'SHEET_DATA_VALIDATION_PLUGIN',
                data: JSON.stringify(components),
            });
        }
        if (data.filters) {
            const filters = {};
            for (const sheetId in Object.keys(data.filters)) {
                const filter = data.filters[sheetId];
                filters[sheetId] = {
                    ref: filter,
                };
            }
            data.resources.push({
                name: 'SHEET_FILTER_PLUGIN',
                data: JSON.stringify(filters),
            });
        }
        uni.unitId = univer.createUnit(UniverInstanceType.UNIVER_SHEET, data).getUnitId();
        const workbook = univerAPI.getActiveWorkbook();
        const permission = workbook.getPermission();
        permission.setPermissionDialogVisible(false);
        const rangeProtectionPermissionEditPoint = permission.permissionPointsDefinition.RangeProtectionPermissionEditPoint;
        if (data.protectionRanges) {
            for (const sheetId in Object.keys(data.protectionRanges)) {
                const sheet = workbook.getSheetBySheetId(sheetId);
                const protections = data.protectionRanges[sheetId];
                protections.forEach(async (protection) => {
                    try {
                        if (protection.locked) {
                            const { permissionId, ruleId } = await permission.addRangeBaseProtection(workbook.getId(), sheet.getSheetId(), [sheet.getRange(protection.range)]);
                            permission.rangeRuleChangedAfterAuth$.subscribe((currentPermissionId) => {
                                if (currentPermissionId === permissionId) {
                                    permission.setRangeProtectionPermissionPoint(workbook.getId(), sheet.getSheetId(), permissionId, rangeProtectionPermissionEditPoint, false);
                                }
                            });
                        }
                    } catch {
                    }
                });
            }
        }
    }

    function snapshot() {
        const workbook = univerAPI.getActiveWorkbook();
        workbook.getActiveSheet().activate();
        const sheetSnapshot = workbook.getSnapshot();
        sheetSnapshot.resources = [];
        return sheetSnapshot;
    }
    return {
        update,
        snapshot,
    };
};

export {
    createInstance,
};
