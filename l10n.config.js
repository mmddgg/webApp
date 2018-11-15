//详细配置参考： https://github.com/ant-tool/atool-l10n



module.exports = {
  "middlewares": {
    "summary": [
      "summary?sourcePattern=i18n-messages/**/*.json"
    ],
    "process": [
      "fetchLocal?source=./client/language,skip",
      "metaToResult?from=defaultMessage,to=en",
      "youdao?apiname=iamatestmanx,apikey=2137553564",
      "reduce?-autoPick,autoReduce[]=local,autoReduce[]=meta"
    ],
    "emit": [
      "save?dest=./client/language"
    ]
  }
}
