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

import type { MenuSchemaType } from '@univerjs/ui';
import {
    AddWorksheetMergeAllCommand,
    AddWorksheetMergeCommand,
    AddWorksheetMergeHorizontalCommand,
    AddWorksheetMergeVerticalCommand,
    CancelFrozenCommand,
    ClearSelectionAllCommand,
    ClearSelectionContentCommand,
    ClearSelectionFormatCommand,
    CopySheetCommand,
    InsertMultiColsLeftCommand,
    InsertMultiColsRightCommand,
    InsertMultiRowsAboveCommand,
    InsertMultiRowsAfterCommand,
    RemoveWorksheetMergeCommand,
    ResetBackgroundColorCommand,
    ResetTextColorCommand,
    SetBackgroundColorCommand,
    SetBorderBasicCommand,
    SetColWidthCommand,
    SetHorizontalTextAlignCommand,
    SetSelectedColsVisibleCommand,
    SetTabColorCommand,
    SetTextRotationCommand,
    SetTextWrapCommand,
    SetVerticalTextAlignCommand,
    SetWorksheetHideCommand,
    ToggleGridlinesCommand,
} from '@univerjs/sheets';
import { ContextMenuGroup, ContextMenuPosition, RibbonPosition, RibbonStartGroup } from '@univerjs/ui';
import {
    SheetCopyCommand,
    SheetPasteBesidesBorderCommand,
    SheetPasteColWidthCommand,
    SheetPasteCommand,
    SheetPasteFormatCommand,
    SheetPasteValueCommand,
} from '../commands/commands/clipboard.command';
import { HideColConfirmCommand } from '../commands/commands/hide-row-col-confirm.command';
import {
    SetRangeBoldCommand,
    SetRangeFontFamilyCommand,
    SetRangeFontSizeCommand,
    SetRangeItalicCommand,
    SetRangeStrickThroughCommand,
    SetRangeTextColorCommand,
    SetRangeUnderlineCommand,
} from '../commands/commands/inline-format.command';
import {
    AddRangeProtectionFromContextMenuCommand,
    AddRangeProtectionFromSheetBarCommand,
    AddRangeProtectionFromToolbarCommand,
    DeleteRangeProtectionFromContextMenuCommand,
    SetRangeProtectionFromContextMenuCommand,
    ViewSheetPermissionFromContextMenuCommand,
    ViewSheetPermissionFromSheetBarCommand,
} from '../commands/commands/range-protection.command';
import { RemoveColConfirmCommand, RemoveRowConfirmCommand } from '../commands/commands/remove-row-col-confirm.command';
import { RemoveSheetConfirmCommand } from '../commands/commands/remove-sheet-confirm.command';
import { SetOnceFormatPainterCommand } from '../commands/commands/set-format-painter.command';
import { SetSelectionFrozenCommand } from '../commands/commands/set-frozen.command';
import { SetWorksheetColAutoWidthCommand } from '../commands/commands/set-worksheet-auto-col-width.command';
import { ShowMenuListCommand } from '../commands/commands/unhide.command';
import {
    ChangeSheetProtectionFromSheetBarCommand,
    DeleteWorksheetProtectionFormSheetBarCommand,
} from '../commands/commands/worksheet-protection.command';
import { RenameSheetOperation } from '../commands/operations/rename-sheet.operation';
import { CellBorderSelectorMenuItemFactory } from './menu/border.menu';
import { CLEAR_SELECTION_MENU_ID, ClearSelectionAllMenuItemFactory, ClearSelectionContentMenuItemFactory, ClearSelectionFormatMenuItemFactory, ClearSelectionMenuItemFactory } from './menu/clear.menu';
import { RemoveColMenuItemFactory, RemoveRowMenuItemFactory } from './menu/delete.menu';
import { ToggleGridlinesMenuFactory } from './menu/gridlines.menu';
import {
    InsertMultiColsLeftHeaderMenuItemFactory,
    InsertMultiColsRightHeaderMenuItemFactory,
    InsertMultiRowsAboveHeaderMenuItemFactory,
    InsertMultiRowsAfterHeaderMenuItemFactory,
} from './menu/insert.menu';
import {
    BackgroundColorSelectorMenuItemFactory,
    BoldMenuItemFactory,
    CancelFrozenMenuItemFactory,
    ColAutoWidthMenuItemFactory,
    CopyMenuItemFactory,
    FontFamilySelectorMenuItemFactory,
    FontSizeSelectorMenuItemFactory,
    FormatPainterMenuItemFactory,
    FrozenMenuItemFactory,
    HideColMenuItemFactory,
    HorizontalAlignMenuItemFactory,
    ItalicMenuItemFactory,
    PASTE_SPECIAL_MENU_ID,
    PasteBesidesBorderMenuItemFactory,
    PasteColWidthMenuItemFactory,
    // PasteColWidthMenuItemFactory,
    PasteFormatMenuItemFactory,
    PasteMenuItemFactory,
    PasteSpacialMenuItemFactory,
    PasteValueMenuItemFactory,
    ResetBackgroundColorMenuItemFactory,
    ResetTextColorMenuItemFactory,
    SetColWidthMenuItemFactory,
    SHEET_FROZEN_HEADER_MENU_ID,
    SheetFrozenHeaderMenuItemFactory,
    ShowColMenuItemFactory,
    StrikeThroughMenuItemFactory,
    TextColorSelectorMenuItemFactory,
    TextRotateMenuItemFactory,
    UnderlineMenuItemFactory,
    VerticalAlignMenuItemFactory,
    WrapTextMenuItemFactory,
} from './menu/menu';
import { CellMergeAllMenuItemFactory, CellMergeCancelMenuItemFactory, CellMergeHorizontalMenuItemFactory, CellMergeMenuItemFactory, CellMergeVerticalMenuItemFactory } from './menu/merge.menu';
import {
    SHEET_PERMISSION_CONTEXT_MENU_ID,
    sheetPermissionAddProtectContextMenuFactory,
    sheetPermissionChangeSheetPermissionSheetBarMenuFactory,
    sheetPermissionContextMenuFactory,
    sheetPermissionEditProtectContextMenuFactory,
    sheetPermissionProtectSheetInSheetBarMenuFactory,
    sheetPermissionRemoveProtectContextMenuFactory,
    sheetPermissionRemoveProtectionSheetBarMenuFactory,
    sheetPermissionToolbarMenuFactory,
    sheetPermissionViewAllProtectRuleContextMenuFactory,
    sheetPermissionViewAllProtectRuleSheetBarMenuFactory,
} from './menu/permission.menu';
import {
    ChangeColorSheetMenuItemFactory,
    CopySheetMenuItemFactory,
    DeleteSheetMenuItemFactory,
    HideSheetMenuItemFactory,
    RenameSheetMenuItemFactory,
    ShowMenuItemFactory,
} from './menu/sheet.menu';

export const menuSchema: MenuSchemaType = {
    [RibbonPosition.START]: {
        [RibbonStartGroup.HISTORY]: {
            [SetOnceFormatPainterCommand.id]: {
                order: 2,
                menuItemFactory: FormatPainterMenuItemFactory,
            },
            [ClearSelectionAllCommand.id]: {
                order: 3,
                menuItemFactory: ClearSelectionAllMenuItemFactory,
            },
        },
        [RibbonStartGroup.FORMAT]: {
            [SetRangeFontFamilyCommand.id]: {
                order: 1,
                menuItemFactory: FontFamilySelectorMenuItemFactory,
            },
            [SetRangeFontSizeCommand.id]: {
                order: 2,
                menuItemFactory: FontSizeSelectorMenuItemFactory,
            },
            // TODO: fontsize +
            // TODO: fontsize -
            [SetRangeBoldCommand.id]: {
                order: 5,
                menuItemFactory: BoldMenuItemFactory,
            },
            [SetRangeItalicCommand.id]: {
                order: 6,
                menuItemFactory: ItalicMenuItemFactory,
            },
            [SetRangeUnderlineCommand.id]: {
                order: 7,
                menuItemFactory: UnderlineMenuItemFactory,
            },
            [SetRangeStrickThroughCommand.id]: {
                order: 8,
                menuItemFactory: StrikeThroughMenuItemFactory,
            },
            [SetRangeTextColorCommand.id]: {
                order: 9,
                menuItemFactory: TextColorSelectorMenuItemFactory,
                [ResetTextColorCommand.id]: {
                    order: 0,
                    menuItemFactory: ResetTextColorMenuItemFactory,
                },
            },
            [SetBackgroundColorCommand.id]: {
                order: 10,
                menuItemFactory: BackgroundColorSelectorMenuItemFactory,
                [ResetBackgroundColorCommand.id]: {
                    order: 0,
                    menuItemFactory: ResetBackgroundColorMenuItemFactory,
                },
            },
            [SetBorderBasicCommand.id]: {
                order: 11,
                menuItemFactory: CellBorderSelectorMenuItemFactory,
            },
        },
        [RibbonStartGroup.LAYOUT]: {
            [SetHorizontalTextAlignCommand.id]: {
                order: 0,
                menuItemFactory: HorizontalAlignMenuItemFactory,
            },
            [SetVerticalTextAlignCommand.id]: {
                order: 3,
                menuItemFactory: VerticalAlignMenuItemFactory,
            },
            [SetTextWrapCommand.id]: {
                order: 6,
                menuItemFactory: WrapTextMenuItemFactory,
            },
            [SetTextRotationCommand.id]: {
                order: 7,
                menuItemFactory: TextRotateMenuItemFactory,
            },
            [AddWorksheetMergeCommand.id]: {
                order: 8,
                menuItemFactory: CellMergeMenuItemFactory,
                [AddWorksheetMergeAllCommand.id]: {
                    order: 0,
                    menuItemFactory: CellMergeAllMenuItemFactory,
                },
                [AddWorksheetMergeVerticalCommand.id]: {
                    order: 1,
                    menuItemFactory: CellMergeVerticalMenuItemFactory,
                },
                [AddWorksheetMergeHorizontalCommand.id]: {
                    order: 2,
                    menuItemFactory: CellMergeHorizontalMenuItemFactory,
                },
                [RemoveWorksheetMergeCommand.id]: {
                    order: 3,
                    menuItemFactory: CellMergeCancelMenuItemFactory,
                },
            },
        },
        [RibbonStartGroup.OTHERS]: {
            [AddRangeProtectionFromToolbarCommand.id]: {
                order: 0,
                menuItemFactory: sheetPermissionToolbarMenuFactory,
            },
        },
    },
    [ContextMenuPosition.MAIN_AREA]: {
        [SheetCopyCommand.name]: {
            order: 0,
            menuItemFactory: CopyMenuItemFactory,
        },
        // [SheetCutCommand.name]: {
        //     order: 1,
        //     menuItemFactory: CutMenuItemFactory,
        // },
        [SheetPasteValueCommand.id]: {
            order: 0,
            menuItemFactory: PasteValueMenuItemFactory,
        },
    },
    [ContextMenuPosition.COL_HEADER]: {
        [ContextMenuGroup.FORMAT]: {
            [SheetCopyCommand.name]: {
                order: 0,
                menuItemFactory: CopyMenuItemFactory,
            },
            // [SheetCutCommand.name]: {
            //     order: 1,
            //     menuItemFactory: CutMenuItemFactory,
            // },
            [SheetPasteCommand.name]: {
                order: 2,
                menuItemFactory: PasteMenuItemFactory,
            },
            [PASTE_SPECIAL_MENU_ID]: {
                order: 3,
                menuItemFactory: PasteSpacialMenuItemFactory,
                [SheetPasteValueCommand.id]: {
                    order: 0,
                    menuItemFactory: PasteValueMenuItemFactory,
                },
                [SheetPasteFormatCommand.id]: {
                    order: 1,
                    menuItemFactory: PasteFormatMenuItemFactory,
                },
                [SheetPasteColWidthCommand.id]: {
                    order: 2,
                    menuItemFactory: PasteColWidthMenuItemFactory,
                },
                [SheetPasteBesidesBorderCommand.id]: {
                    order: 3,
                    menuItemFactory: PasteBesidesBorderMenuItemFactory,
                },
            },
            [CLEAR_SELECTION_MENU_ID]: {
                order: 4,
                menuItemFactory: ClearSelectionMenuItemFactory,
                [ClearSelectionContentCommand.id]: {
                    order: 0,
                    menuItemFactory: ClearSelectionContentMenuItemFactory,
                },
                [ClearSelectionFormatCommand.id]: {
                    order: 1,
                    menuItemFactory: ClearSelectionFormatMenuItemFactory,
                },
                [ClearSelectionAllCommand.id]: {
                    order: 2,
                    menuItemFactory: ClearSelectionAllMenuItemFactory,
                },
            },
        },
        [ContextMenuGroup.LAYOUT]: {
            order: 1,
            [InsertMultiColsLeftCommand.id]: {
                order: 0,
                menuItemFactory: InsertMultiColsLeftHeaderMenuItemFactory,
            },
            [InsertMultiColsRightCommand.id]: {
                order: 0,
                menuItemFactory: InsertMultiColsRightHeaderMenuItemFactory,
            },
            [HideColConfirmCommand.id]: {
                order: 1,
                menuItemFactory: HideColMenuItemFactory,
            },
            [SetSelectedColsVisibleCommand.id]: {
                order: 2,
                menuItemFactory: ShowColMenuItemFactory,
            },
            [RemoveColConfirmCommand.id]: {
                order: 2,
                menuItemFactory: RemoveColMenuItemFactory,
            },
            [SetColWidthCommand.id]: {
                order: 3,
                menuItemFactory: SetColWidthMenuItemFactory,
            },
            [SetWorksheetColAutoWidthCommand.id]: {
                order: 4,
                menuItemFactory: ColAutoWidthMenuItemFactory,
            },
            [SHEET_FROZEN_HEADER_MENU_ID]: {
                order: 5,
                menuItemFactory: SheetFrozenHeaderMenuItemFactory,
                [SetSelectionFrozenCommand.id]: {
                    order: 0,
                    menuItemFactory: FrozenMenuItemFactory,
                },
                [CancelFrozenCommand.id]: {
                    order: 3,
                    menuItemFactory: CancelFrozenMenuItemFactory,
                },
            },
            [SHEET_PERMISSION_CONTEXT_MENU_ID]: {
                order: 6,
                menuItemFactory: sheetPermissionContextMenuFactory,
                [AddRangeProtectionFromContextMenuCommand.id]: {
                    order: 0,
                    menuItemFactory: sheetPermissionAddProtectContextMenuFactory,
                },
                [SetRangeProtectionFromContextMenuCommand.id]: {
                    order: 1,
                    menuItemFactory: sheetPermissionEditProtectContextMenuFactory,
                },
                [DeleteRangeProtectionFromContextMenuCommand.id]: {
                    order: 2,
                    menuItemFactory: sheetPermissionRemoveProtectContextMenuFactory,
                },
                [ViewSheetPermissionFromContextMenuCommand.id]: {
                    order: 3,
                    menuItemFactory: sheetPermissionViewAllProtectRuleContextMenuFactory,
                },
            },
        },
        [ContextMenuGroup.DATA]: {
            order: 2,
        },
        [ContextMenuGroup.OTHERS]: {
            order: 3,
        },
    },
    [ContextMenuPosition.ROW_HEADER]: {
        [SheetCopyCommand.name]: {
            order: 0,
            menuItemFactory: CopyMenuItemFactory,
        },
        [SheetPasteValueCommand.id]: {
            order: 0,
            menuItemFactory: PasteValueMenuItemFactory,
        },
        [InsertMultiRowsAboveCommand.id]: {
            order: 0,
            menuItemFactory: InsertMultiRowsAboveHeaderMenuItemFactory,
        },
        [InsertMultiRowsAfterCommand.id]: {
            order: 1,
            menuItemFactory: InsertMultiRowsAfterHeaderMenuItemFactory,
        },
        [RemoveRowConfirmCommand.id]: {
            order: 1,
            menuItemFactory: RemoveRowMenuItemFactory,
        },
    },
    [ContextMenuPosition.FOOTER_TABS]: {
        [ContextMenuGroup.OTHERS]: {
            order: 0,
            [RemoveSheetConfirmCommand.id]: {
                order: 0,
                menuItemFactory: DeleteSheetMenuItemFactory,
            },
            [CopySheetCommand.id]: {
                order: 1,
                menuItemFactory: CopySheetMenuItemFactory,
            },
            [RenameSheetOperation.id]: {
                order: 2,
                menuItemFactory: RenameSheetMenuItemFactory,
            },
            [SetTabColorCommand.id]: {
                order: 3,
                menuItemFactory: ChangeColorSheetMenuItemFactory,
            },
            [SetWorksheetHideCommand.id]: {
                order: 4,
                menuItemFactory: HideSheetMenuItemFactory,
            },
            // [SetWorksheetShowCommand.id]: {
            //     order: 5,
            //     menuItemFactory: UnHideSheetMenuItemFactory,
            // },
            [ShowMenuListCommand.id]: {
                order: 6,
                menuItemFactory: ShowMenuItemFactory,
            },
            [AddRangeProtectionFromSheetBarCommand.id]: {
                order: 7,
                menuItemFactory: sheetPermissionProtectSheetInSheetBarMenuFactory,
            },
            [DeleteWorksheetProtectionFormSheetBarCommand.id]: {
                order: 8,
                menuItemFactory: sheetPermissionRemoveProtectionSheetBarMenuFactory,
            },
            [ChangeSheetProtectionFromSheetBarCommand.id]: {
                order: 9,
                menuItemFactory: sheetPermissionChangeSheetPermissionSheetBarMenuFactory,
            },
            [ViewSheetPermissionFromSheetBarCommand.id]: {
                order: 10,
                menuItemFactory: sheetPermissionViewAllProtectRuleSheetBarMenuFactory,
            },
        },
    },
    [ContextMenuPosition.FOOTER_MENU]: {
        [ContextMenuGroup.OTHERS]: {
            [ToggleGridlinesCommand.id]: {
                order: 1,
                menuItemFactory: ToggleGridlinesMenuFactory,
            },
        },
    },
};
