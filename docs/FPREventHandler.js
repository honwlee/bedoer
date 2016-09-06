/*
 * ケースタイプ：FPRのイベントを処理するためのハンドラークラス
 */
define([
    "dojo/on",
    "dojo/dom-construct",
    "./Utility"
], function(on, domConstruct, util) {
    var FPREventHandler = {
        // FPR自動作成(Excel読込)
        SCQM001E02_Handler: function() {

        },
        // 重要度判定ガイド取得
        SCQM003E02_HandlerBegin: function(page, configure) {
            var caseInfo = util.getCaseInfo(page) || {};
            return util.fillInputValue(configure, {
                caseInfo: {
                    CaseId: caseInfo.Id
                }
            });
        },

        SCQM003E02_Handler: function(page, data, values) {
            var caseInfo = util.getCaseInfo(page) || {},
                info = util.fillOutputValue(data, values);
            util.showWithDialog(domConstruct.create("a", {
                innerHTML: info.output.ImportanceJudgeGuideLink,
                href: info.output.ImportanceJudgeGuideLink,
                target: "_blank"
            }), {
                title: "重要度判定ガイド, CaseID: " + caseInfo.Id
            });
        },

        SCQM003E02_HandlerEnd: function() {

        },
        // 現品送付状出力
        SCQM003E03_Handler: function() {

        },
        // FPRサマリー出力
        SCQM003E04_Handler: function() {

        },

    };
    return FPREventHandler;
});
