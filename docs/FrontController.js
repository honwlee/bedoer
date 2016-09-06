define([
    "dojo/on",
    "dojo/request/xhr",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/string",
    'dojo/json',
    "dojo/Deferred",
    "dojo/text!./data/configures.json",
    "dojo/i18n!./nls/messages",
    "dijit/registry",
    "./Utility",
    "./ActualGootsEventHandler",
    "./CloseCouncilEventHandler",
    "./CommonEventHandler",
    "./FPREventHandler",
    "./FPRReviewEventHandler",
    "./InvestigationEventHandler",
    "./ProgressEventHandler",
    "./SACaseEventHandler",
    "./SAMeetingEventHandler"
], function(on, xhr, domAttr, domClass, domConstruct, declare, lang, string, JSON, Deferred,
    configureData, nlsMessages, registry, util) {

    var config = JSON.parse(configureData);

    var FrontController = {
        handle: function(eventId, local, page) {
            var configure = lang.clone(config[eventId]);
            if (!configure) return;
            var fixedConfigure,
                module = require(configure.module),
                handerMethod = module[configure.methods.handler],
                beginMethod = module ? module[configure.methods.begin] : null,
                endMethod = module ? module[configure.methods.end] : null;

            //begin handling event, output log 

            //イベント固有の初期化処理があればここで実行されます。
            if (beginMethod) fixedConfigure = beginMethod.apply([lang.clone(configure.serviceCall), page]);
            fixedConfigure = fixedConfigure || {};

            var deferred = new Deferred(),
                serviceCall = configure.serviceCall;
            if (serviceCall) {
                //サーバへアクセスする必要なイベントの場合
                var url = serviceCall.url,
                    output = serviceCall.output || {},
                    params = {
                        "EventId": eventId, //必須情報
                        "Locale": local || "ja" //必須情報
                    };
                //fixedConfigureからInputパラメータの設定を追加
                if (fixedConfigure.input) lang.mixin(params, fixedConfigure.input);

                util.getApiData(url, serviceCall.method, params).then(function(data) {
                    //処理結果コードをチェック
                    if (data.ProcessingResultCode) {
                        //成功した場合
                        if (!output.noting) {
                            //取得した内容を画面へ反映
                            //
                            if (!output.file) handerMethod.apply([page, data, lang.clone(output)]);
                            // util.updateCaseAttrs(page, data);
                        }
                    }
                    if (data.MessageList) {
                        //メッセージがあれば出力
                    }
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
            }
            if (endMethod) {
                deferred.then(function(data) {
                    //イベント固有の終了化処理があればここで実行されます。
                    endMethod.apply([page, data]);
                    //end handling event, output log
                }, function(err) {

                });
            }
            return deferred.promise;
        }
    };
    return FrontController;
});
