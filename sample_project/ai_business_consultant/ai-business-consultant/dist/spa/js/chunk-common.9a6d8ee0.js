(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[0],{"007d":function(e,t,a){"use strict";a("37cb")},"00a0":function(e,t,a){},"01e5":function(e,t,a){"use strict";a("1b53")},"0311":function(e,t,a){},"0bfa":function(e,t,a){"use strict";a("8796")},"0e73":function(e,t,a){"use strict";a("4e9f")},1479:function(e,t,a){"use strict";a("94ed")},"159f":function(e,t,a){"use strict";a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return i})),a.d(t,"d",(function(){return s})),a.d(t,"b",(function(){return l}));var o=a("5184");const n=o["a"]`
query getOrgDistributorSplitRatios{
  getOrgDistributorSplitRatios{
    id
    name
    ratioJson
  }
}
`,i=o["a"]`
  mutation createDistributorSplitRatio($distributorSplitRatio: DistributorSplitRatioInput!) {
    createDistributorSplitRatio(distributorSplitRatio: $distributorSplitRatio){
      id
      name

    }
  }
`,s=o["a"]`
  mutation updateDistributorSplitRatio($distributorSplitRatio: DistributorSplitRatioInput!,$id: Int!) {
    updateDistributorSplitRatio(distributorSplitRatio: $distributorSplitRatio,id: $id){
      id
      name
    }
  }
`,l=o["a"]`
  mutation deleteDistributorSplitRatio($id: Int!) {
    deleteDistributorSplitRatio(id: $id)
  }
`},1928:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"grid-node"},[e._v("\n  "+e._s(e.itemData.label)+"\n")])},n=[],i={name:"grid-node",props:{itemData:{type:Object},canvasNode:{type:Object}},methods:{},created(){}},s=i,l=(a("007d"),a("2877")),r=Object(l["a"])(s,o,n,!1,null,"7fdb7498",null);t["default"]=r.exports},"1b53":function(e,t,a){},"1d15":function(e,t,a){"use strict";a("6017")},2109:function(e,t,a){"use strict";a("fd80")},2509:function(e,t,a){},"26ef":function(e,t,a){},2892:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{on:{click:e.click}},[a("div",{staticClass:"base-group"},[a("div",{staticClass:"base-group-header"},[e._v("\n      "+e._s(e.itemData.userData.name)+"\n    ")]),a("div",{staticClass:"base-group-content"})])])},n=[],i={name:"base-group",props:{itemData:{type:Object}},methods:{click(){console.log("group click")}},created(){}},s=i,l=(a("4672"),a("2877")),r=Object(l["a"])(s,o,n,!1,null,"3b8b64e2",null);t["default"]=r.exports},"2dc0":function(e,t,a){},"2e04":function(e,t,a){},"37cb":function(e,t,a){},"37d1":function(e,t,a){},3912:function(e,t,a){"use strict";a("3f85")},"3cf9":function(e,t,a){"use strict";a("00a0")},"3f85":function(e,t,a){},"3faa":function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"a",(function(){return i}));var o=a("5184");const n=o["a"]`
mutation updateSfbot ($id: Int!,$sfbot: SfbotUpdateInput!)  {
    updateSfbot(id: $id,sfbot: $sfbot){
        chatAiName
    }
  }
`,i=o["a"]`
query getSfbots  {
    getSfbots  {
        id
        chatAiName
      chatAiGreeting
      model
      character_desc
      temperature
      top_p
      max_tokens
      kbId
      charDescLaw
      charDescQos
      charDescCki
      promptKbx
      promptQos
      promptCki
      promptAsk
      chatAiGreeting
      chatAiAvatarUrl
      chatAiPeroration
      rechargeReminder
  }
}
`},4060:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"base-node"},[a("div",[e._v("测试.vue 的node节点"+e._s(e.itemData.id))]),a("div",{staticClass:"center"},[a("el-button",{attrs:{type:"success"},on:{click:e.click}},[e._v("button")])],1)])},n=[],i={name:"base-node",props:{itemData:{type:Object},canvasNode:{type:Object}},methods:{click(e){console.log("click"),e.stopPropagation()}},created(){}},s=i,l=(a("1479"),a("2877")),r=Object(l["a"])(s,o,n,!1,null,"832ed79a",null);t["default"]=r.exports},"45c1":function(e,t,a){"use strict";a.d(t,"l",(function(){return n})),a.d(t,"k",(function(){return i})),a.d(t,"n",(function(){return s})),a.d(t,"a",(function(){return l})),a.d(t,"o",(function(){return r})),a.d(t,"h",(function(){return c})),a.d(t,"j",(function(){return d})),a.d(t,"i",(function(){return u})),a.d(t,"b",(function(){return p})),a.d(t,"d",(function(){return m})),a.d(t,"p",(function(){return f})),a.d(t,"q",(function(){return g})),a.d(t,"c",(function(){return b})),a.d(t,"m",(function(){return h})),a.d(t,"f",(function(){return v})),a.d(t,"g",(function(){return y})),a.d(t,"e",(function(){return w}));var o=a("5184");const n=o["a"]`
query getOrgDistributors{
  getOrgDistributors{
    id
    name
    desc
    wxQrCode
    t2QrCode
    uuid
    createdAt
    t1DistributorId
    t1Distributor{
       id
    name
     desc
    wxQrCode
    t2QrCode
    uuid
    createdAt
     user{
    id
    name
    email
    phone
    }

        distributorSplitRatio{
    id
    name
    ratioJson
    }
       distributorSplitRatio2{
    id
    name
    ratioJson
    }
       distributorSplitRatio3{
    id
    name
    ratioJson
    }
    }
    distributorSplitRatioId
    distributorSplitRatio2Id
    distributorSplitRatio3Id
      user{
    id
    name
    email
    phone
    }
        distributorSplitRatio{
    id
    name
    ratioJson
    }
       distributorSplitRatio2{
    id
    name
    ratioJson
    }
       distributorSplitRatio3{
    id
    name
    ratioJson
    }
    t1Distributor{
    id
    name
    }
    t2Distributors{
    id
    name
     desc
    wxQrCode
    t2QrCode
    uuid
    createdAt
    t1DistributorId
     t1Distributor{
    id
    name
    }
    distributorSplitRatioId
     user{
    id
    name
    email
    phone
    }

    }
  }
}
`,i=o["a"]`
query getOrgDistributorCommissionStatistics($lastDate: Int!) {
  getOrgDistributorCommissionStatistics(lastDate: $lastDate)
}
`,s=o["a"]`
query getTwoMonthDistributorWithdrawFunds {
  getTwoMonthDistributorWithdrawFunds
}
`,l=o["a"]`
mutation acceptedDistributorApplyWxIncomeTransfer($id: Int!) {
  acceptedDistributorApplyWxIncomeTransfer(id: $id){
  id
  }
}
`,r=o["a"]`
query getWxPaidOrdersByDate ($date: String!) {
    getWxPaidOrdersByDate(date: $date) {
        id
        out_trade_no
        total
        wxUserId
        success_time
        createdAt
        t1_share
        t2_share
        state
        wxUser{
            name
            avatarUrl
        }
    }
}
`,c=o["a"]`
query getDistributorWithdrawFundsAndCount  ($take: Int,$skip: Int){
    getDistributorWithdrawFundsAndCount(take: $take,skip: $skip) {
    totalCount
    data{
    id
      amount
      batch_status
      createdAt
      approvedDate
      finishedDate
      notiyInfo
      t1WxPaidOrders{
      id
      out_trade_no
      wxUserId
      success_time
      state
      total
      wxUser{
      name
      avatarUrl
      }
      createdAt
      commodity{
       name
      }
       t1_share
       t2_share
      }
         t2WxPaidOrders{
      id
      out_trade_no
      wxUserId
      success_time
      state
      total
      createdAt
        wxUser{
      name
      avatarUrl
      }
      commodity{
       name
      }
       t1_share
       t2_share
      }
      distributor{
      name
      }
    }


  }
}
`,d=o["a"]`
query getOrgDistributorCommissionBalance {
  getOrgDistributorCommissionBalance
}
`,u=o["a"]`
query getOrgDistributorByUuid($uuid: String!) {
  getOrgDistributorByUuid(uuid: $uuid){
    id
    name
  }
}
`,p=o["a"]`
  mutation createDistributor($user: UserCreateAsDistributorInput!,$distributor: DistributorInput!) {
    createDistributor(user: $user,distributor: $distributor){
      id
      name

    }
  }
`,m=o["a"]`
  mutation distributorApplyWxIncomeTransfer{
    distributorApplyWxIncomeTransfer{
    id
    }
  }
`,f=o["a"]`
  mutation registerUserAsDistributor($distributorName: String!,$uuid: String!,$user: UserCreateAsDistributorInput!) {
    registerUserAsDistributor(distributorName: $distributorName,uuid: $uuid,user: $user){
      id
      name

    }
  }
`,g=o["a"]`
  mutation updateDistributor($distributor: DistributorUpdateInput!,$id: Int!) {
    updateDistributor(distributor: $distributor,id: $id){
      id
      name
    }
  }
`,b=o["a"]`
  mutation deleteDistributor($id: Int!) {
    deleteDistributor(id: $id)
  }
`,h=o["a"]`
query getSellDistributorCommoditys {
  getSellDistributorCommoditys{
    id
        name
        uuid
        qrCode
        validDays
        h5Link
        legalDocumentProjectId
        price
        availableQueries
        legalDocumentProject{
            id
            name
        }
        lawyers{
        id
        name
        }
        createdAt
        updatedAt
        mainImg
        description
        marketPrice
        details
        carouselImgs
        detailImgs
        status
        creatorId
        stock
        state
        organizationId
  }
}
`,v=o["a"]`
query getAllOrganizations {
  getAllOrganizations{
    id
    name
  }
}
`,y=o["a"]`
query getCommoditysFromDistributor($orgId: Int!)  {
  getCommoditysFromDistributor(orgId: $orgId) {
    id
    name
    mainImg
    legalDocumentProject{
      id
      name
    }
    status
    price
    description
    createdAt
    updatedAt
  }
}
`,w=o["a"]`
query distributorPurchaseCommodity($orgId: Int!,$stock: Int!,$commodityId: Int!) {
  distributorPurchaseCommodity(orgId: $orgId,stock: $stock,commodityId: $commodityId)
}
`},4672:function(e,t,a){"use strict";a("37d1")},"4aa3":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"label",on:{onClick:e.labelClick}},[e._v("\n  "+e._s(this.itemData.userData.content)+"\n")])},n=[],i={name:"base-label",props:{itemData:{type:Object}},methods:{labelClick(e){console.log("labelClick"),e.stopPropagation(),this.$emit("click","emitlabelClick")}}},s=i,l=(a("01e5"),a("2877")),r=Object(l["a"])(s,o,n,!1,null,null,null);t["default"]=r.exports},"4e00":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"item"},[a("el-select",{staticClass:"condition",staticStyle:{width:"180px"},attrs:{clearable:"",filterable:""},on:{change:e.handleChange},model:{value:e.itemData.condition,callback:function(t){e.$set(e.itemData,"condition",t)},expression:"itemData.condition"}},e._l(e.conditionList,(function(e){return a("el-option",{key:e.standardCode,attrs:{label:e.codeNm,value:e.standardCode}})})),1),e.itemData.desc?a("div",{staticClass:"card"},[a("div",{staticClass:"title"},[a("span",[e._v("\n        "+e._s(e.itemData.title)+"\n      ")]),a("i",{staticClass:"el-icon-close close",on:{click:e.deleteItem}})]),a("el-row",{staticClass:"content"},[a("span",[e._v(e._s(e.itemData.desc))])])],1):e._e()],1)},n=[],i={props:{itemData:Object},data(){return{conditionList:[{standardCode:"01",codeNm:"如下所有条件都成立"},{standardCode:"02",codeNm:"如下任一条件成立"},{standardCode:"03",codeNm:"如下所有条件都不成立"},{standardCode:"04",codeNm:"并且"},{standardCode:"05",codeNm:"或者"}]}},methods:{handleChange(){},handleOperateChange(){},handleTypeChange(){},deleteItem(){this.$emit("del",this.itemData.id)}}},s=i,l=(a("0bfa"),a("2877")),r=Object(l["a"])(s,o,n,!1,null,"76fac1de",null);t["default"]=r.exports},"4e9f":function(e,t,a){},"513a":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"w-full items-center h-full px-8"},[0==e.isCusult?a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.createClick("parent",null)}}},[e._v(e._s(e.$t("action.create")))]):e._e(),a("el-table",{ref:"table",staticStyle:{width:"100%"},attrs:{data:e.tableData,"row-key":"id","expand-row-keys":e.expandedRows,"default-expand-all":""},on:{"expand-change":e.handleExpandChange}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-table",{staticClass:"mx-10 my-3",staticStyle:{width:"100%"},attrs:{data:t.row.subclassLegalDocumentElements,border:"","cell-style":{fontSize:"14px",backgroundColor:"#F8F8F8"},"header-cell-style":{fontSize:"14px",backgroundColor:"#F8F8F8"}}},[a("el-table-column",{attrs:{label:e.$t("element.name"),prop:"name"}}),a("el-table-column",{attrs:{label:e.$t("element.desc"),prop:"desc"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"top",trigger:"hover"}},[a("span",{staticStyle:{"white-space":"pre-line"}},[e._v(e._s(t.row.desc))]),a("span",{staticClass:"truncate",attrs:{slot:"reference"},slot:"reference"},[e._v(" "+e._s(t.row.desc))])])]}}],null,!0)}),a("el-table-column",{attrs:{label:e.$t("element.sample"),prop:"sample"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"top",trigger:"hover"}},[a("span",{staticStyle:{"white-space":"pre-line"}},[e._v(e._s(t.row.sample))]),a("span",{staticClass:"truncate",attrs:{slot:"reference"},slot:"reference"},[e._v(" "+e._s(t.row.sample))])])]}}],null,!0)}),a("el-table-column",{attrs:{label:e.$t("element.spec"),prop:"spec"}}),a("el-table-column",{attrs:{label:e.$t("action.action"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(o){return[a("q-btn-dropdown",{attrs:{unelevated:"","dropdown-icon":"more_vert"}},[a("q-list",[a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(t){return e.editClick("child",o.row)}}},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.$t("action.edit")))])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(t){return e.handleCopyElement(o.row)}}},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.$t("element.copyElement")))])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(t){return e.onDeleteClick(o.row)}}},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.$t("action.delete")))])],1)],1)],1)],1),a("el-tooltip",{staticClass:"item",staticStyle:{color:"black"},attrs:{effect:"dark",content:"上移",placement:"top-start"}},[a("el-button",{attrs:{type:"text",icon:"el-icon-top"},on:{click:function(a){return e.moveChildUp(t.row.subclassLegalDocumentElements,o.row,o.$index)}}})],1),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"下移",placement:"top-start"}},[a("el-button",{staticStyle:{color:"black"},attrs:{type:"text",icon:"el-icon-bottom"},on:{click:function(a){return e.moveChildDown(t.row.subclassLegalDocumentElements,o.row,o.$index)}}})],1)]}}],null,!0)})],1)]}}])}),a("el-table-column",{attrs:{label:e.$t("element.name"),prop:"name"}}),a("el-table-column",{attrs:{label:e.$t("element.desc"),prop:"desc"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"top",trigger:"hover"}},[a("span",{staticStyle:{"white-space":"pre-line"}},[e._v(e._s(t.row.desc))]),a("span",{staticClass:"truncate",attrs:{slot:"reference"},slot:"reference"},[e._v(" "+e._s(t.row.desc))])])]}}])}),a("el-table-column",{attrs:{label:e.$t("element.sample"),prop:"sample"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"top-start",trigger:"hover"}},[a("span",{staticStyle:{"white-space":"pre-line"}},[e._v(e._s(t.row.sample))]),a("span",{staticClass:"truncate",attrs:{slot:"reference"},slot:"reference"},[e._v(" "+e._s(t.row.sample))])])]}}])}),a("el-table-column",{attrs:{label:e.$t("element.spec"),prop:"spec"}}),a("el-table-column",{attrs:{label:e.$t("action.action"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("q-btn-dropdown",{attrs:{unelevated:"","dropdown-icon":"more_vert"}},[a("q-list",[a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(a){return e.createClick("child",t.row)}}},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.$t("element.addChild")))])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(a){return e.handleCopyElement(t.row)}}},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.$t("element.copyElement")))])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(a){return e.editClick("parent",t.row)}}},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.$t("action.edit")))])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(a){return e.onDeleteClick(t.row)}}},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.$t("action.delete")))])],1)],1)],1)],1),a("el-tooltip",{staticClass:"item",staticStyle:{color:"black"},attrs:{effect:"dark",content:"上移",placement:"top-start"}},[a("el-button",{attrs:{type:"text",icon:"el-icon-top"},on:{click:function(a){return e.moveUp(t.row,t.$index)}}})],1),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"下移",placement:"top-start"}},[a("el-button",{staticStyle:{color:"black"},attrs:{type:"text",icon:"el-icon-bottom"},on:{click:function(a){return e.moveDown(t.row,t.$index)}}})],1)]}}])})],1),a("el-dialog",{attrs:{title:e.$t("element.copyElement"),width:"40%","close-on-click-modal":!1,visible:e.dialogCopyVisible},on:{"update:visible":function(t){e.dialogCopyVisible=t}}},[a("el-form",{staticClass:"w-full",attrs:{"label-position":"left","label-width":"130px"}},[a("el-form-item",{attrs:{label:e.$t("element.selectProject")}},[a("el-select",{on:{change:function(t){return e.handleSelectProject()}},model:{value:e.selectProject,callback:function(t){e.selectProject=t},expression:"selectProject"}},e._l(e.projects,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:e.$t("element.selectElement")}},[a("el-cascader",{attrs:{options:e.copyElements,props:{checkStrictly:!0},clearable:""},model:{value:e.selectElement,callback:function(t){e.selectElement=t},expression:"selectElement"}})],1)],1),a("el-alert",{staticStyle:{"white-space":"pre-line"},attrs:{title:"注意",type:"warning",description:"所选择的目标要素，在复制后将被更新成与当前要素完全一致.\n           请在复制操作前仔细检查，确保这是您期望的结果.",closable:!1,"show-icon":""}}),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogCopyVisible=!1}}},[e._v(e._s(e.$t("profile.Cancel")))]),a("el-button",{attrs:{type:"primary"},on:{click:e.handleCopy}},[e._v(e._s(e.$t("element.copy")))])],1)],1),a("el-dialog",{attrs:{title:"create"===e.elementTemplate.modle?e.$t("action.create"):e.$t("action.edit"),width:"60%","close-on-click-modal":!1,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{staticClass:"w-full",attrs:{"label-position":"left"}},[a("el-form-item",{attrs:{label:e.$t("element.name")}},[a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"right-end",title:"应用场景：",width:"200",trigger:"hover"}},[a("ul",{staticClass:"ml-3"},[a("li",[e._v("案件询问")]),a("li",[e._v("要素提取")]),a("li",[e._v("要素确认")]),a("li",[e._v("文书生成")])]),a("i",{staticClass:"el-icon-info",staticStyle:{"margin-left":"15px","margin-right":"25px"},attrs:{slot:"reference"},slot:"reference"})]),a("el-input",{attrs:{autocomplete:"off"},model:{value:e.elementTemplate.name,callback:function(t){e.$set(e.elementTemplate,"name",t)},expression:"elementTemplate.name"}})],1)]),a("el-form-item",{attrs:{label:e.$t("element.desc")}},[a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"right-end",title:"应用场景：",width:"200",trigger:"hover"}},[a("ul",{staticClass:"ml-3"},[a("li",[e._v("案件询问")]),a("li",[e._v("要素提取")]),a("li",[e._v("要素确认")]),a("li",[e._v("文书生成")])]),a("i",{staticClass:"el-icon-info",staticStyle:{"margin-left":"15px","margin-right":"25px"},attrs:{slot:"reference"},slot:"reference"})]),a("el-input",{attrs:{type:"textarea",autocomplete:"off"},model:{value:e.elementTemplate.desc,callback:function(t){e.$set(e.elementTemplate,"desc",t)},expression:"elementTemplate.desc"}})],1)]),a("el-form-item",{attrs:{label:e.$t("element.sample")}},[a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"right-end",title:"应用场景：",width:"200",trigger:"hover"}},[a("ul",{staticClass:"ml-3"},[a("li",[e._v("案件询问")]),a("li",[e._v("要素提取")]),a("li",[e._v("要素确认")]),a("li",[e._v("文书生成")])]),a("i",{staticClass:"el-icon-info",staticStyle:{"margin-left":"15px","margin-right":"25px"},attrs:{slot:"reference"},slot:"reference"})]),a("el-input",{attrs:{type:"textarea",autocomplete:"off"},model:{value:e.elementTemplate.sample,callback:function(t){e.$set(e.elementTemplate,"sample",t)},expression:"elementTemplate.sample"}})],1)]),a("el-form-item",{attrs:{label:e.$t("element.spec")}},[a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"right-end",title:"应用场景：",width:"200",trigger:"hover"}},[a("ul",{staticClass:"ml-3"},[a("li",[e._v("要素确认")])]),a("i",{staticClass:"el-icon-info",staticStyle:{"margin-left":"15px","margin-right":"25px"},attrs:{slot:"reference"},slot:"reference"})]),a("el-input",{attrs:{type:"textarea",autocomplete:"off"},model:{value:e.elementTemplate.spec,callback:function(t){e.$set(e.elementTemplate,"spec",t)},expression:"elementTemplate.spec"}})],1)]),e.eableDependency?a("el-form-item",{attrs:{label:e.$t("element.Dependency")}},[a("div",{staticStyle:{display:"flex"}},[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"right-end",title:"应用场景：",width:"200",trigger:"hover"}},[a("ul",{staticClass:"ml-3"},[a("li",[e._v("案件询问")]),a("li",[e._v("要素提取")])]),a("i",{staticClass:"el-icon-info",staticStyle:{"margin-left":"15px","margin-right":"25px"},attrs:{slot:"reference"},slot:"reference"})]),a("el-select",{attrs:{size:"small",clearable:"",placeholder:e.$t("element.DependencyElement")},model:{value:e.elementTemplate.dependencyFactor,callback:function(t){e.$set(e.elementTemplate,"dependencyFactor",t)},expression:"elementTemplate.dependencyFactor"}},e._l(e.dependencyElements,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.name}})})),1),a("el-select",{staticClass:"ml-3",staticStyle:{width:"100px"},attrs:{size:"small",clearable:"",placeholder:e.$t("element.Relational")},on:{change:function(t){return e.handleSelectRelative()}},model:{value:e.elementTemplate.dependencyCondOp,callback:function(t){e.$set(e.elementTemplate,"dependencyCondOp",t)},expression:"elementTemplate.dependencyCondOp"}},e._l(e.relatives,(function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})),1),a("el-input",{staticClass:"ml-3",staticStyle:{width:"300px"},attrs:{size:"small",clearable:"",disabled:"存在"===e.elementTemplate.dependencyCondOp||"不存在"===e.elementTemplate.dependencyCondOp,placeholder:e.$t("element.ValueNeed")},model:{value:e.elementTemplate.dependencyValue,callback:function(t){e.$set(e.elementTemplate,"dependencyValue",t)},expression:"elementTemplate.dependencyValue"}})],1)]):e._e(),a("el-form-item",{attrs:{label:e.$t("element.PresetConditions")}},[a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"right-end",title:"应用场景：",width:"200",trigger:"hover"}},[a("ul",{staticClass:"ml-3"},[a("li",[e._v("要素提取")])]),a("i",{staticClass:"el-icon-info",staticStyle:{"margin-left":"15px","margin-right":"25px"},attrs:{slot:"reference"},slot:"reference"})]),a("el-input",{attrs:{type:"textarea",autocomplete:"off"},model:{value:e.elementTemplate.promptFig,callback:function(t){e.$set(e.elementTemplate,"promptFig",t)},expression:"elementTemplate.promptFig"}})],1)]),e.eableDependency?e._e():a("el-form-item",{attrs:{label:e.$t("element.promptAsk")}},[a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"right-end",title:"应用场景：",width:"200",trigger:"hover"}},[a("ul",{staticClass:"ml-3"},[a("li",[e._v("案件询问")])]),a("span",{staticStyle:{display:"block","margin-top":"15px"}},[e._v("占位符:")]),a("ul",{staticClass:"\n                        ml-3"},[a("li",[e._v("{要素名称}")]),a("li",[e._v("{下一要素}")]),a("li",[e._v("{下一要素的描述}")]),a("li",[e._v("{要素定义}")]),a("li",[e._v("{已知信息}")]),a("li",[e._v("{知识库结果}")]),a("li",[e._v("{资料}")]),a("li",[e._v("{今天日期}")]),a("li",[e._v("{today_date}")])]),a("i",{staticClass:"el-icon-info",staticStyle:{"margin-left":"15px","margin-right":"25px"},attrs:{slot:"reference"},slot:"reference"})]),a("el-input",{attrs:{type:"textarea",autocomplete:"off"},model:{value:e.elementTemplate.promptAsk,callback:function(t){e.$set(e.elementTemplate,"promptAsk",t)},expression:"elementTemplate.promptAsk"}})],1)]),e.eableDependency?e._e():a("el-form-item",{attrs:{label:e.$t("element.promptRef")}},[a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"right-end",title:"应用场景：",width:"200",trigger:"hover"}},[a("ul",{staticClass:"ml-3"},[a("li",[e._v("案件询问")])]),a("i",{staticClass:"el-icon-info",staticStyle:{"margin-left":"15px","margin-right":"25px"},attrs:{slot:"reference"},slot:"reference"})]),a("el-input",{attrs:{type:"textarea",autocomplete:"off"},model:{value:e.elementTemplate.promptRef,callback:function(t){e.$set(e.elementTemplate,"promptRef",t)},expression:"elementTemplate.promptRef"}})],1)]),a("el-form-item",{attrs:{label:e.$t("element.isFlag")}},[a("q-checkbox",{attrs:{"true-value":1,"false-value":0},model:{value:e.elementTemplate.flag,callback:function(t){e.$set(e.elementTemplate,"flag",t)},expression:"elementTemplate.flag"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v(e._s(e.$t("profile.Cancel")))]),a("el-button",{attrs:{type:"primary"},on:{click:e.handleCreate}},[e._v(e._s(e.$t("profile.Confirm")))])],1)],1)],1)},n=[],i=a("750b"),s=a("1840"),l=(a("b850"),a("6eb7")),r=a("5184");const c=r["a"]`
mutation createLegalDocumentElement ($legalDocumentElement: LegalDocumentElementInput!)  {
    createLegalDocumentElement(legalDocumentElement: $legalDocumentElement) {
        name

}
  }
`,d=r["a"]`
mutation updateLegalDocumentElement ($id: Int!,$legalDocumentElement: LegalDocumentElementUpdateInput!)  {
    updateLegalDocumentElement(id: $id,legalDocumentElement: $legalDocumentElement){
        name
    }
  }
`,u=r["a"]`
mutation swapLegalDocumentElementOrder ($id: Int!,$targetId: Int!)  {
    swapLegalDocumentElementOrder(id: $id,targetId: $targetId)
  }
`,p=r["a"]`
  mutation deleteLegalDocumentElement($id: Int!) {
    deleteLegalDocumentElement(id: $id)
  }
  `,m=r["a"]`
  mutation copyLegalDocumentElement($id: Int!,$targetId: Int!) {
    copyLegalDocumentElement(id: $id,targetId: $targetId){
    id}
  }
  `,f=r["a"]`
query getLegalDocumentElements ($legalDocumentProjectId: Int!) {
    getLegalDocumentElements (legalDocumentProjectId: $legalDocumentProjectId) {
        id
        name
        desc
        spec
        sample
        questionMore
        question
        orderId
        flag
        promptAsk
        promptRef
        promptFig
        dependencyFactor
        dependencyCondOp
        dependencyValue
        parentLegalDocumentElementId
        subclassLegalDocumentElements{
        id
        name
        desc
        spec
        flag
        sample
        questionMore
        question
        dependencyFactor
        dependencyCondOp
        dependencyValue
        promptAsk
        promptRef
        promptFig
        parentLegalDocumentElementId
        }
  }
}
`;var g=a("86c4"),b=(a("cdde"),a("436b")),h=a("1f2a"),v=a("fadb"),y=Object(i["defineComponent"])({data(){return{a:!1,arr:[],isMobile:Object(v["a"])()}},setup(e,{root:t}){const{mutate:a}=Object(s["useMutation"])(c),{mutate:o}=Object(s["useMutation"])(m),{mutate:n}=Object(s["useMutation"])(u),{mutate:r}=Object(s["useMutation"])(g["e"]),{mutate:v}=Object(s["useMutation"])(g["d"]),{mutate:y}=Object(s["useMutation"])(f),{mutate:w}=Object(s["useMutation"])(p),{mutate:C}=Object(s["useMutation"])(d),$=e=>e.id,D=Object(i["ref"])([]),k=async()=>{const e=await r();e&&(T.value=e.data.getLegalDocumentProjects)},x=async(e,a,o)=>{if(0===o)return void l["a"].error(t.$t("element.first"));const i=await n({targetId:e[o-1].id,id:a.id});i&&z(!0),console.log(a,o)},I=async(e,a,o)=>{if(o===e.length-1)return void l["a"].error(t.$t("element.last"));const i=await n({targetId:e[o+1].id,id:a.id});i&&z(!0),console.log(a,o)};let _=Object(i["ref"])([]),j=[];const S=(e,t)=>{j=t},A=async(e,a)=>{if(0===a)return void l["a"].error(t.$t("element.first"));const o=await n({targetId:B.value[a-1].id,id:e.id});o&&z(!0),console.log(e,a)},N=async(e,a)=>{if(a===B.value.length-1)return void l["a"].error(t.$t("element.last"));const o=await n({targetId:B.value[a+1].id,id:e.id});o&&z(!0),console.log(e,a)},O=Object(i["ref"])(["是","不是","有","没有","存在","不存在"]),M=()=>{P.value.push({id:P.value.length+1+"",label:"",name:"",type:"textarea"})},P=Object(i["ref"])([]),E=Object(i["ref"])(""),L=Object(i["ref"])(!1),T=Object(i["ref"])([]),U=e=>{P.value.splice(e,1)},R=Object(i["ref"])(!1),q=Object(i["ref"])(!1),B=Object(i["ref"])([]),F=Object(i["reactive"])({modle:"create",name:"",desc:"",spec:"",sample:"",question:"",promptFig:"",promptAsk:"",promptRef:"",position:0,dependencyFactor:"",dependencyValue:"",dependencyCondOp:"",parentLegalDocumentElementId:0,flag:1,id:0}),z=async e=>{const t=await y({legalDocumentProjectId:Number(sessionStorage.getItem("legalDocumentProjectId"))});t&&(B.value=t.data.getLegalDocumentElements,e&&(_.value=[],j.forEach((e=>{_.value.push(e.id)}))))},Q=Object(i["ref"])(0),W=async()=>{if(0==Z.value.length)return void l["a"].error(t.$t("element.selectElement"));const e=await o({id:Z.value[Z.value.length-1],targetId:Q.value});e&&(l["a"].success(t.$t("notify.Done")),L.value=!1,z(!1))},V=e=>{Q.value=e.id,E.value="",Z.value=[],k(),L.value=!0},J=Object(i["ref"])(!1),Y=(e,t)=>{"child"==e?(J.value=!0,F.parentLegalDocumentElementId=t.id):(J.value=!1,F.parentLegalDocumentElementId=0),F.modle="create",R.value=!0,F.name="",F.desc="",F.spec="",F.sample="",F.dependencyFactor="",F.dependencyValue="",F.dependencyCondOp="",F.question="",F.promptFig="",F.promptAsk="",F.promptRef="",F.flag=1,ee.value=!1,X.value=t.subclassLegalDocumentElements},G=async()=>{if(!F.name)return void l["a"].error(t.$t("element.nameRequire"));if(F.dependencyFactor){if(""==F.dependencyCondOp)return void l["a"].error(t.$t("element.RelationalNeed"));if("存在"==F.dependencyCondOp||"不存在"==F.dependencyCondOp)F.dependencyValue="";else if(""==F.dependencyValue)return void l["a"].error(t.$t("element.ValueNeed"))}let e=[];P.value.forEach((t=>{e.push(t.label)}));const o={name:F.name,desc:F.desc,spec:F.spec,sample:F.sample,question:F.question,promptFig:F.promptFig,promptAsk:F.promptAsk,promptRef:F.promptRef,flag:Number(F.flag),questionMore:JSON.stringify(e),dependencyFactor:F.dependencyFactor,dependencyCondOp:F.dependencyCondOp,dependencyValue:F.dependencyValue};try{"create"==F.modle?(0!=F.parentLegalDocumentElementId&&(o.parentLegalDocumentElementId=F.parentLegalDocumentElementId),o.legalDocumentProjectId=Number(sessionStorage.getItem("legalDocumentProjectId")),await a({legalDocumentElement:o})):await C({id:F.id,legalDocumentElement:o}),R.value=!1,z(!1),l["a"].success(t.$t("notify.Done"))}catch(n){l["a"].error(n.message)}},Z=Object(i["ref"])(""),K=async()=>{"存在"!=F.dependencyCondOp&&"不存在"!=F.dependencyCondOp||(F.dependencyValue="")},H=async()=>{D.value=[];const e=await y({legalDocumentProjectId:Number(E.value)});e&&e.data.getLegalDocumentElements.forEach((e=>{let t={value:e.id,label:e.name,children:[]};null!=e.subclassLegalDocumentElements&&e.subclassLegalDocumentElements.length>0&&e.subclassLegalDocumentElements.forEach((e=>{let a={value:e.id,label:e.name};t.children.push(a)})),D.value.push(t)}))},X=Object(i["ref"])([]),ee=Object(i["ref"])(!1),te=(e,t)=>{P.value=[],X.value=[],F.modle="edit",R.value=!0,F.id=t.id,F.name=t.name,F.desc=t.desc,F.spec=t.spec,F.sample=t.sample,F.question=t.question,F.flag=t.flag,F.promptFig=t.promptFig,F.promptAsk=t.promptAsk,F.promptRef=t.promptRef,F.dependencyFactor=t.dependencyFactor,F.dependencyValue=t.dependencyValue,F.dependencyCondOp=t.dependencyCondOp,J.value="child"==e,B.value.forEach((e=>{e.id==t.parentLegalDocumentElementId&&(X.value=e.subclassLegalDocumentElements)}));let a=""==t.questionMore?[]:JSON.parse(t.questionMore);a.forEach((e=>{let t={id:P.value.length+1+"",label:e};P.value.push(t)}))},ae=async()=>{const e={name:filterName.value,viewers:Number(isPrivate.value)};try{await updateFilterMutation({filter:e,id:filterId.value});R.value=!1,l["a"].success(t.$t("notify.Done"))}catch(a){l["a"].error(a.message)}},oe=Object(i["ref"])(0),ne=async e=>{b["a"].create({title:t.$t("action.delTip"),message:t.$t("action.delTipText"),ok:{color:"red",label:t.$t("action.delete"),noCaps:!0},cancel:{label:t.$t("action.cancel"),noCaps:!0,flat:!0},style:{zIndex:10002}}).onOk((async()=>{try{await w({id:Number(e.id)}),z(!1),l["a"].success(t.$t("notify.Done"))}catch(a){console.log("---------error",a),l["a"].error(a.message)}}))};return Object(i["onMounted"])((()=>{h["a"].$on("switchNewProject",(e=>{oe.value=e.isConsult,z(!1)}))})),{search:"",getRowKeys:$,selectProject:E,copyElements:D,selectElement:Z,expandedRows:_,handleExpandChange:S,handleCopy:W,isCusult:oe,moveUp:A,moveDown:N,moveChildDown:I,handleSelectRelative:K,moveChildUp:x,handleSelectProject:H,dialogFormVisibleicon:q,handleCopyElement:V,elementTemplate:F,dialogCopyVisible:L,projects:T,eableDependency:J,handleCreate:G,relatives:O,addFormData:M,formData:P,dependencyElements:X,formDel:U,tableData:B,createClick:Y,isDependency:ee,editClick:te,thumbStyle:{right:"4px",borderRadius:"5px",backgroundColor:"#027be3",width:"5px",opacity:.75},barStyle:{right:"2px",borderRadius:"9px",backgroundColor:"#027be3",width:"9px",opacity:.2},onUpdate:ae,onDeleteClick:ne,dialogFormVisible:R}},methods:{}}),w=y,C=(a("1d15"),a("2877")),$=a("f20b"),D=a("1c1c"),k=a("66e5"),x=a("4074"),I=a("0170"),_=a("9c40"),j=a("8f8e"),S=a("7f67"),A=a("eebe"),N=a.n(A),O=Object(C["a"])(w,o,n,!1,null,null,null);t["default"]=O.exports;N()(O,"components",{QBtnDropdown:$["a"],QList:D["a"],QItem:k["a"],QItemSection:x["a"],QItemLabel:I["a"],QBtn:_["a"],QCheckbox:j["a"]}),N()(O,"directives",{ClosePopup:S["a"]})},"531c":function(e,t,a){"use strict";a("2e04")},"57e3":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pa-md container"},[a("div",{staticClass:"pb-8",staticStyle:{display:"flex","flex-direction":"column","justify-content":"center","align-items":"center"}},[a("el-form",{staticClass:"w-full",attrs:{"label-position":"top","label-width":"200px"}},[a("el-form-item",[a("div",{staticClass:"row"},[a("div",{staticClass:"column"},[a("span",[e._v(e._s(e.$t("service.servicerAvatar")))]),a("q-img",{staticClass:"imgbox",style:{width:"100px",height:"100px",border:"1px  solid grey"},attrs:{src:e.userInfo.chatAiAvatarUrl}}),a("el-upload",{staticClass:"upload-demo ",attrs:{"http-request":e.beforeupload,action:"","show-file-list":!1,accept:"image/jpg,image/jpeg,image/png"}},[a("el-button",{attrs:{type:"primary"}},[e._v(e._s(e.$t("profile.selectimage")))])],1)],1),a("div",{staticClass:"column",staticStyle:{"margin-left":"100px"}},[a("span",[e._v(e._s(e.$t("service.contactUs")))]),a("q-img",{style:{width:"100px",height:"100px",border:"1px  solid grey"},attrs:{src:e.userInfo.qrCodeUrl}}),a("el-upload",{staticClass:"upload-demo mt-3",attrs:{action:"","http-request":e.beforeuploadQR,"show-file-list":!1,accept:"image/jpg,image/jpeg,image/png"}},[a("el-button",{attrs:{type:"primary"}},[e._v(e._s(e.$t("profile.selectimage")))])],1)],1),a("el-button",{attrs:{type:"text"},on:{click:e.openWx}},[e._v("企业微信二维码")])],1)]),a("el-form-item",{attrs:{label:e.$t("service.name")}},[a("el-input",{model:{value:e.userInfo.chatAiName,callback:function(t){e.$set(e.userInfo,"chatAiName",t)},expression:"userInfo.chatAiName"}})],1),a("el-form-item",{attrs:{label:e.$t("service.greeting")}},[a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.userInfo.chatAiGreeting,callback:function(t){e.$set(e.userInfo,"chatAiGreeting",t)},expression:"userInfo.chatAiGreeting"}})],1),a("el-form-item",{attrs:{label:e.$t("service.ending")}},[a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.userInfo.chatAiPeroration,callback:function(t){e.$set(e.userInfo,"chatAiPeroration",t)},expression:"userInfo.chatAiPeroration"}})],1),a("el-form-item",{attrs:{label:e.$t("service.Rechargereminder")}},[a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.userInfo.rechargeReminder,callback:function(t){e.$set(e.userInfo,"rechargeReminder",t)},expression:"userInfo.rechargeReminder"}})],1),a("el-form-item",{staticClass:"mt-5"},[a("el-button",{attrs:{type:"primary"},on:{click:e.handleSave}},[e._v(e._s(e.$t("service.save")))])],1)],1)],1)])},n=[],i=a("750b"),s=(a("ac79"),a("1840")),l=a("3faa"),r=a("86c4"),c=(a("db56"),a("6eb7")),d=a("b850"),u=a("8ee3"),p=a("1f2a"),m=a("fadb"),f=Object(i["defineComponent"])({name:"Login",data(){return{isPwd:!0,isNetWrok:!0,isMobile:Object(m["a"])()}},mounted(){Object(m["b"])(this,"isMobile")},setup(e,{root:t}){Object(i["computed"])(d["b"].currentUser);const{mutate:a}=Object(s["useMutation"])(r["d"]),{mutate:o}=Object(s["useMutation"])(r["g"]),{mutate:n}=Object(s["useMutation"])(l["a"]),{mutate:m}=Object(s["useMutation"])(l["b"]),f=Object(i["reactive"])({id:0,chatAiName:"",chatAiGreeting:"",chatAiAvatarUrl:"",qrCodeUrl:"",chatAiPeroration:"",rechargeReminder:""}),g=()=>{window.open("https://work.weixin.qq.com/wework_admin/frame#csPlugin","_blank")},b=async e=>{const t=await Object(u["a"])(e.file);return f.chatAiAvatarUrl=t.fileUrl,t.fileUrl},h=async e=>{const t=await Object(u["a"])(e.file);return f.qrCodeUrl=t.fileUrl,t.fileUrl},v=async()=>{const e={chatAiName:f.chatAiName,chatAiAvatarUrl:f.chatAiAvatarUrl,qrCodeUrl:f.qrCodeUrl,chatAiGreeting:f.chatAiGreeting,chatAiPeroration:f.chatAiPeroration,rechargeReminder:f.rechargeReminder},a=await o({id:f.id,legalDocumentProject:e});a&&c["a"].success(t.$t("notify.Done"))};return Object(i["onMounted"])((()=>{p["a"].$on("switchNewProject",(e=>{e&&(f.chatAiName=e.chatAiName,f.chatAiAvatarUrl=e.chatAiAvatarUrl,f.qrCodeUrl=e.qrCodeUrl,f.chatAiGreeting=e.chatAiGreeting,f.chatAiPeroration=e.chatAiPeroration,f.rechargeReminder=e.rechargeReminder,f.id=e.id)}))})),{handleSave:v,beforeupload:b,beforeuploadQR:h,openWx:g,userInfo:f}}}),g=f,b=(a("7c72"),a("2877")),h=a("068f"),v=a("eebe"),y=a.n(v),w=Object(b["a"])(g,o,n,!1,null,"50b9d7ec",null);t["default"]=w.exports;y()(w,"components",{QImg:h["a"]})},"5a2a":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pa-md w-full"},[a("div",{staticClass:"pb-8",staticStyle:{display:"flex","flex-direction":"column","justify-content":"center","align-items":"center"}},[a("el-form",{staticClass:"w-full",attrs:{"label-position":"left","label-width":"85px"}},[a("el-form-item",{attrs:{label:e.$t("chatbot.model")}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.chatBotInfo.model,callback:function(t){e.$set(e.chatBotInfo,"model",t)},expression:"chatBotInfo.model"}},e._l(e.chatmodels,(function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})),1)],1),a("el-form-item",{attrs:{label:e.$t("chatbot.kbId")}},[a("el-select",{staticClass:"mt-3",attrs:{clearable:"",placeholder:"请选择"},model:{value:e.chatBotInfo.kbId,callback:function(t){e.$set(e.chatBotInfo,"kbId",t)},expression:"chatBotInfo.kbId"}},e._l(e.tableData,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:e.$t("chatbot.temperature")}},[a("q-slider",{staticClass:"mt-3",staticStyle:{width:"60%"},attrs:{min:0,max:1,step:.01,label:"","label-always":"",color:"primary"},model:{value:e.chatBotInfo.temperature,callback:function(t){e.$set(e.chatBotInfo,"temperature",t)},expression:"chatBotInfo.temperature"}})],1),a("el-form-item",{attrs:{label:e.$t("chatbot.top_p")}},[a("q-slider",{staticClass:"mt-3",staticStyle:{width:"60%"},attrs:{min:.01,max:.99,step:.1,label:"","label-always":"",color:"primary"},model:{value:e.chatBotInfo.top_p,callback:function(t){e.$set(e.chatBotInfo,"top_p",t)},expression:"chatBotInfo.top_p"}})],1),a("el-form-item",{attrs:{label:e.$t("chatbot.max_tokens")}},[a("q-slider",{staticClass:"mt-3",staticStyle:{width:"60%"},attrs:{min:0,max:4096,step:10,label:"","label-always":"",color:"primary"},model:{value:e.chatBotInfo.max_tokens,callback:function(t){e.$set(e.chatBotInfo,"max_tokens",t)},expression:"chatBotInfo.max_tokens"}})],1),a("el-form-item",{attrs:{label:e.$t("chatbot.charDesc")}},[a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"column",staticStyle:{width:"95px"}},[a("span",[e._v("\n              "+e._s(e.$t("chatbot.charDescLaw"))+"\n            ")]),a("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"center"}},[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"right-end",title:"占位符：",width:"200",trigger:"hover"}},[a("ul",{staticClass:"ml-3"},[a("li",[e._v("{今天日期}")]),a("li",[e._v("{today_date}")])]),a("i",{staticClass:"el-icon-info",attrs:{slot:"reference"},slot:"reference"})]),a("el-button",{staticStyle:{"margin-left":"15px","margin-right":"25px"},attrs:{icon:"el-icon-s-tools",type:"text"},on:{click:function(t){return e.config("1")}}})],1)]),a("el-input",{staticStyle:{color:"#fff"},attrs:{type:"textarea",rows:3},model:{value:e.chatBotInfo.charDescLaw,callback:function(t){e.$set(e.chatBotInfo,"charDescLaw",t)},expression:"chatBotInfo.charDescLaw"}})],1),a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"column",staticStyle:{width:"95px"}},[a("span",[e._v("\n              "+e._s(e.$t("chatbot.charDescQos"))+"\n            ")]),a("el-button",{attrs:{icon:"el-icon-s-tools",type:"text"},on:{click:function(t){return e.config("2")}}})],1),a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.chatBotInfo.charDescQos,callback:function(t){e.$set(e.chatBotInfo,"charDescQos",t)},expression:"chatBotInfo.charDescQos"}})],1),a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"column",staticStyle:{width:"95px"}},[a("span",[e._v("\n              "+e._s(e.$t("chatbot.charDescCki"))+"\n            ")]),a("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"center"}},[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"right-end",title:"占位符：",width:"200",trigger:"hover"}},[a("span",{staticStyle:{"white-space":"pre-line"}},[a("ul",{staticClass:"ml-3"},[a("li",[e._v("{要素名称}")]),a("li",[e._v("{要素定义}")]),a("li",[e._v("{已知信息}")]),a("li",[e._v("{今天日期}")]),a("li",[e._v("{today_date}")])])]),a("i",{staticClass:"el-icon-info",attrs:{slot:"reference"},slot:"reference"})]),a("el-button",{staticStyle:{"margin-left":"15px","margin-right":"25px"},attrs:{icon:"el-icon-s-tools",type:"text"},on:{click:function(t){return e.config("3")}}})],1)]),a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.chatBotInfo.charDescCki,callback:function(t){e.$set(e.chatBotInfo,"charDescCki",t)},expression:"chatBotInfo.charDescCki"}})],1),a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"column",staticStyle:{width:"95px"}},[a("span",[e._v("\n              "+e._s(e.$t("chatbot.promptAsk"))+"\n            ")]),a("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"center"}},[a("el-button",{attrs:{icon:"el-icon-s-tools",type:"text"},on:{click:function(t){return e.config("4")}}})],1)]),a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.chatBotInfo.charDescAsk,callback:function(t){e.$set(e.chatBotInfo,"charDescAsk",t)},expression:"chatBotInfo.charDescAsk"}})],1),a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"column",staticStyle:{width:"95px"}},[a("span",[e._v("\n              "+e._s(e.$t("chatbot.prompt_doc"))+"\n            ")]),a("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"center"}},[a("el-button",{attrs:{icon:"el-icon-s-tools",type:"text"},on:{click:function(t){return e.config("5")}}})],1)]),a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.chatBotInfo.chardesc_doc,callback:function(t){e.$set(e.chatBotInfo,"chardesc_doc",t)},expression:"chatBotInfo.chardesc_doc"}})],1)]),a("el-form-item",{staticClass:"mt-5 ",attrs:{label:e.$t("chatbot.prompt")}},[a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"column",staticStyle:{width:"95px"}},[a("span",[e._v("\n              "+e._s(e.$t("chatbot.promptKbx"))+"\n            ")]),a("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"center"}},[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"right-end",title:"占位符：",width:"200",trigger:"hover"}},[a("ul",{staticClass:"ml-3"},[a("li",[e._v("\n                    {{\n                    knowledge\n                    "),e._v("\n                    }}\n                  ")]),a("li",[e._v("\n                    {{\n                    question\n                    "),e._v("\n                    }}\n                  ")])]),a("i",{staticClass:"el-icon-info",staticStyle:{"margin-left":"15px","margin-right":"25px"},attrs:{slot:"reference"},slot:"reference"})])],1)]),a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.chatBotInfo.promptKbx,callback:function(t){e.$set(e.chatBotInfo,"promptKbx",t)},expression:"chatBotInfo.promptKbx"}})],1),a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"column",staticStyle:{width:"95px"}},[a("span",[e._v("\n              "+e._s(e.$t("chatbot.promptQos"))+"\n            ")]),a("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"center"}})]),a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.chatBotInfo.promptQos,callback:function(t){e.$set(e.chatBotInfo,"promptQos",t)},expression:"chatBotInfo.promptQos"}})],1),a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"column",staticStyle:{width:"95px"}},[a("span",[e._v("\n              "+e._s(e.$t("chatbot.promptCki"))+"\n            ")]),a("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"center"}},[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"right-end",title:"占位符：",width:"200",trigger:"hover"}},[a("ul",{staticClass:"ml-3"},[a("li",[e._v("{要素名称}")]),a("li",[e._v("{要素定义}")]),a("li",[e._v("{已知信息}")]),a("li",[e._v("{今天日期}")]),a("li",[e._v("{today_date}")]),a("li",[e._v("{资料}")])]),a("i",{staticClass:"el-icon-info",staticStyle:{"margin-left":"15px","margin-right":"25px"},attrs:{slot:"reference"},slot:"reference"})])],1)]),a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.chatBotInfo.promptCki,callback:function(t){e.$set(e.chatBotInfo,"promptCki",t)},expression:"chatBotInfo.promptCki"}})],1),a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"column",staticStyle:{width:"95px"}},[a("span",[e._v("\n              "+e._s(e.$t("chatbot.promptAsk"))+"\n            ")]),a("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"center"}},[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"right-end",title:"占位符：",width:"200",trigger:"hover"}},[a("ul",{staticClass:"ml-3"},[a("li",[e._v("{要素名称}")]),a("li",[e._v("{下一要素}")]),a("li",[e._v("{下一要素的描述}")]),a("li",[e._v("{要素定义}")]),a("li",[e._v("{已知信息}")]),a("li",[e._v("{知识库结果}")]),a("li",[e._v("{今天日期}")]),a("li",[e._v("{today_date}")]),a("li",[e._v("{资料}")])]),a("i",{staticClass:"el-icon-info",staticStyle:{"margin-left":"15px","margin-right":"25px"},attrs:{slot:"reference"},slot:"reference"})])],1)]),a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.chatBotInfo.promptAsk,callback:function(t){e.$set(e.chatBotInfo,"promptAsk",t)},expression:"chatBotInfo.promptAsk"}})],1),a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"column",staticStyle:{width:"95px"}},[a("span",[e._v("\n              "+e._s(e.$t("chatbot.promptAskLast"))+"\n            ")]),a("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"center","white-space":"pre-line"}},[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"right-end",title:"",width:"200",trigger:"hover"}},[a("span",{staticStyle:{display:"block"}},[e._v("可选提示词 ")]),a("span",{staticStyle:{display:"block"}},[e._v("适用于最后一个一级要素")]),a("span",{staticStyle:{display:"block","margin-top":"15px"}},[e._v("占位符:")]),a("ul",{staticClass:"\n                      ml-3"},[a("li",[e._v("{要素名称}")]),a("li",[e._v("{下一要素}")]),a("li",[e._v("{下一要素的描述}")]),a("li",[e._v("{要素定义}")]),a("li",[e._v("{已知信息}")]),a("li",[e._v("{知识库结果}")]),a("li",[e._v("{今天日期}")]),a("li",[e._v("{today_date}")]),a("li",[e._v("{资料}")])]),a("i",{staticClass:"el-icon-info",staticStyle:{"margin-left":"15px","margin-right":"25px"},attrs:{slot:"reference"},slot:"reference"})])],1)]),a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.chatBotInfo.promptAskLast,callback:function(t){e.$set(e.chatBotInfo,"promptAskLast",t)},expression:"chatBotInfo.promptAskLast"}})],1),a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"column",staticStyle:{width:"95px"}},[a("span",[e._v("\n              "+e._s(e.$t("chatbot.prompt_doc"))+"\n            ")]),a("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"center"}},[a("el-popover",{staticStyle:{"white-space":"pre-line"},attrs:{placement:"right-end",title:"占位符：",width:"200",trigger:"hover"}},[a("ul",{staticClass:"ml-3"},[a("li",[e._v("{today_date}")]),a("li",[e._v("{case_element}")]),a("li",[e._v("{case_inquiry}")]),a("li",[e._v("{case_sample}")]),a("li",[e._v("{format_instructions}")])]),a("i",{staticClass:"el-icon-info",staticStyle:{"margin-left":"15px","margin-right":"25px"},attrs:{slot:"reference"},slot:"reference"})])],1)]),a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.chatBotInfo.prompt_doc,callback:function(t){e.$set(e.chatBotInfo,"prompt_doc",t)},expression:"chatBotInfo.prompt_doc"}})],1)]),a("el-form-item",{staticClass:"mt-3",attrs:{label:e.$t("chatbot.Placeholder")}},[a("el-form-item",{attrs:{label:e.$t("chatbot.nextCkiLabel")}},[a("el-input",{attrs:{type:"textarea",rows:2},model:{value:e.chatBotInfo.nextCkiLabel,callback:function(t){e.$set(e.chatBotInfo,"nextCkiLabel",t)},expression:"chatBotInfo.nextCkiLabel"}})],1),a("el-form-item",{staticClass:"mt-2",attrs:{label:e.$t("chatbot.nextCkiLabeldes")}},[a("el-input",{attrs:{type:"textarea",rows:2},model:{value:e.chatBotInfo.nextCkiDesc,callback:function(t){e.$set(e.chatBotInfo,"nextCkiDesc",t)},expression:"chatBotInfo.nextCkiDesc"}})],1)],1),a("el-form-item",{staticClass:"mt-3",attrs:{label:e.$t("chatbot.text_length")}},[a("el-form-item",{attrs:{label:e.$t("chatbot.promptAsk")}},[a("el-input",{attrs:{type:"number",oninput:"if(this.value < 0) this.value = 0"},model:{value:e.chatBotInfo.turnsAsk,callback:function(t){e.$set(e.chatBotInfo,"turnsAsk",t)},expression:"chatBotInfo.turnsAsk"}})],1),a("el-form-item",{attrs:{label:e.$t("chatbot.turnsRpt")}},[a("el-input",{attrs:{type:"number",oninput:"if(this.value < 0) this.value = 0"},model:{value:e.chatBotInfo.turnsRpt,callback:function(t){e.$set(e.chatBotInfo,"turnsRpt",t)},expression:"chatBotInfo.turnsRpt"}})],1)],1),a("el-form-item",{staticClass:"mt-3",attrs:{label:e.$t("chatbot.reference_doc")}},[a("el-form-item",{attrs:{label:e.$t("chatbot.prompt_doc")}},[a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.chatBotInfo.reference_doc,callback:function(t){e.$set(e.chatBotInfo,"reference_doc",t)},expression:"chatBotInfo.reference_doc"}})],1)],1),a("el-form-item",{staticClass:"mt-5"},[a("el-button",{attrs:{type:"primary"},on:{click:e.handleSave}},[e._v(e._s(e.$t("service.save")))])],1)],1)],1),a("el-dialog",{attrs:{width:"40%","close-on-click-modal":!1,title:e.configDialogTitle,visible:e.configDialog,"modal-append-to-body":!1,"destroy-on-close":!0},on:{"update:visible":function(t){e.configDialog=t}}},[a("el-form",{staticClass:"w-full",attrs:{"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:e.$t("chatbot.model")}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.configJson.model,callback:function(t){e.$set(e.configJson,"model",t)},expression:"configJson.model"}},e._l(e.chatmodels,(function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})),1)],1),a("el-form-item",{attrs:{label:e.$t("chatbot.temperature")}},[a("q-slider",{staticClass:"mt-3",staticStyle:{width:"100%"},attrs:{min:0,max:1,step:.01,label:"","label-always":"",color:"primary"},model:{value:e.configJson.temperature,callback:function(t){e.$set(e.configJson,"temperature",t)},expression:"configJson.temperature"}})],1),a("el-form-item",{attrs:{label:e.$t("chatbot.top_p")}},[a("q-slider",{staticClass:"mt-3",staticStyle:{width:"100%"},attrs:{min:.01,max:.99,step:.1,label:"","label-always":"",color:"primary"},model:{value:e.configJson.top_p,callback:function(t){e.$set(e.configJson,"top_p",t)},expression:"configJson.top_p"}})],1),a("el-form-item",{attrs:{label:e.$t("chatbot.max_tokens")}},[a("q-slider",{staticClass:"mt-3",staticStyle:{width:"100%"},attrs:{min:0,max:4096,step:10,label:"","label-always":"",color:"primary"},model:{value:e.configJson.max_tokens,callback:function(t){e.$set(e.configJson,"max_tokens",t)},expression:"configJson.max_tokens"}})],1)],1),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.configDialog=!1}}},[e._v(e._s(e.$t("chatbot.Cancel")))]),a("el-button",{attrs:{type:"primary"},on:{click:e.handleConfigDelete}},[e._v(e._s(e.$t("chatbot.Delete")))]),a("el-button",{attrs:{type:"primary"},on:{click:e.handleConfigSave}},[e._v("\n        "+e._s(e.$t("chatbot.Confirm"))+"\n      ")])],1)],1)],1)},n=[],i=a("750b"),s=(a("ac79"),a("1840")),l=a("7f1b"),r=a("3faa"),c=(a("db56"),a("6eb7")),d=a("b850"),u=a("8ee3"),p=a("86c4"),m=a("1f2a"),f=a("fadb"),g=Object(i["defineComponent"])({name:"Login",data(){return{isPwd:!0,isNetWrok:!0,isMobile:Object(f["a"])()}},mounted(){Object(f["b"])(this,"isMobile")},setup(e,{root:t}){Object(i["computed"])(d["b"].currentUser);const{mutate:a}=Object(s["useMutation"])(l["a"]),{mutate:o}=Object(s["useMutation"])(p["d"]),{mutate:n}=Object(s["useMutation"])(p["g"]),f=Object(i["ref"])(""),g=Object(i["ref"])([]),b=async()=>{const e=await a();e&&(g.value=JSON.parse(e.data.getZhiPuAllKb).data.list)},h=Object(i["ref"])({model:"gpt-3.5-turbo",temperature:.9,top_p:.7,max_tokens:128}),v=Object(i["ref"])(!1),y=Object(i["ref"])(0),w=e=>{switch(y.value=e,v.value=!0,console.log(e,I.llmCfgKbx),e){case"1":return f.value="咨询服务 模型/参数",void(h.value=I.llmCfgKbx?JSON.parse(I.llmCfgKbx):{});case"2":return h.value=I.llmCfgQos?JSON.parse(I.llmCfgQos):{},void(f.value="问题识别 模型/参数");case"3":return h.value=I.llmCfgCki?JSON.parse(I.llmCfgCki):{},void(f.value="要素提取 模型/参数");case"4":return h.value=I.llmCfgAsk?JSON.parse(I.llmCfgAsk):{},void(f.value="案件询问 模型/参数");case"5":return h.value=I.llmCfgDoc?JSON.parse(I.llmCfgDoc):{},void(f.value="文书生成 模型/参数")}},C=async()=>{switch(y.value){case"1":I.llmCfgKbx=null;break;case"2":I.llmCfgQos=null;break;case"3":I.llmCfgCki=null;break;case"4":I.llmCfgAsk=null;break;case"5":I.llmCfgDoc=null;break}j(),v.value=!1},$=async()=>{switch(y.value){case"1":I.llmCfgKbx=JSON.stringify(h.value);break;case"2":I.llmCfgQos=JSON.stringify(h.value);break;case"3":I.llmCfgCki=JSON.stringify(h.value);break;case"4":I.llmCfgAsk=JSON.stringify(h.value);break;case"5":I.llmCfgDoc=JSON.stringify(h.value);break}j(),v.value=!1},{mutate:D}=Object(s["useMutation"])(r["a"]),{mutate:k}=Object(s["useMutation"])(r["b"]),x=["glm-3-turbo","glm-4","glm-4-0520","glm-4-air","glm-4-airx","qwen-long","farui-plus","qwen-turbo","qwen-plus","qwen-max","gpt-3.5-turbo"],I=Object(i["reactive"])({id:0,servicerName:"",servicerGreeting:"",servicerAvatarUrl:"",model:"glm-3-turbo",temperature:.9,prompt:"",charDesc:"",top_p:.7,max_tokens:500,kbId:0,charDescLaw:"",charDescQos:"",charDescCki:"",charDescAsk:"",chardesc_doc:"",llmCfgKbx:"",llmCfgQos:"",llmCfgCki:"",llmCfgAsk:"",llmCfgDoc:"",promptKbx:"",promptQos:"",promptCki:"",promptAsk:"",promptAskLast:"",prompt_doc:"",reference_doc:"",nextCkiLabel:"",nextCkiDesc:"",turnsAsk:0,turnsRpt:0}),_=async e=>{const t=await Object(u["a"])(e.file);return I.servicerAvatarUrl=t.fileUrl,t.fileUrl},j=async()=>{const e={model:I.model,temperature:I.temperature,top_p:I.top_p,max_tokens:I.max_tokens,charDescLaw:I.charDescLaw,nextCkiLabel:I.nextCkiLabel,nextCkiDesc:I.nextCkiDesc,charDescQos:I.charDescQos,charDescCki:I.charDescCki,chardesc_doc:I.chardesc_doc,charDescAsk:I.charDescAsk,kbId:I.kbId,promptKbx:I.promptKbx,promptQos:I.promptQos,promptCki:I.promptCki,promptAsk:I.promptAsk,promptAskLast:I.promptAskLast,prompt_doc:I.prompt_doc,llmCfgKbx:I.llmCfgKbx,llmCfgQos:I.llmCfgQos,llmCfgCki:I.llmCfgCki,llmCfgAsk:I.llmCfgAsk,llmCfgDoc:I.llmCfgDoc,reference_doc:I.reference_doc,turnsAsk:Number(I.turnsAsk),turnsRpt:Number(I.turnsRpt)},a=await n({id:I.id,legalDocumentProject:e});a&&c["a"].success(t.$t("notify.Done"))};return Object(i["onMounted"])((()=>{b(),m["a"].$on("switchNewProject",(e=>{e&&(I.model=e.model,I.temperature=e.temperature,I.top_p=e.top_p,I.max_tokens=e.max_tokens,I.charDescLaw=e.charDescLaw,I.nextCkiLabel=e.nextCkiLabel,I.nextCkiDesc=e.nextCkiDesc,I.charDescQos=e.charDescQos,I.charDescAsk=e.charDescAsk,I.chardesc_doc=e.chardesc_doc,I.llmCfgKbx=e.llmCfgKbx,I.llmCfgQos=e.llmCfgQos,I.llmCfgCki=e.llmCfgCki,I.llmCfgAsk=e.llmCfgAsk,I.llmCfgDoc=e.llmCfgDoc,I.charDescCki=e.charDescCki,I.promptKbx=e.promptKbx,I.promptQos=e.promptQos,I.promptCki=e.promptCki,I.kbId=e.kbId,I.promptAsk=e.promptAsk,I.promptAskLast=e.promptAskLast,I.prompt_doc=e.prompt_doc,I.reference_doc=e.reference_doc,I.turnsAsk=e.turnsAsk,I.turnsRpt=e.turnsRpt,I.id=e.id)}))})),{handleSave:j,tableData:g,chatmodels:x,configDialog:v,config:w,configJson:h,beforeupload:_,chatBotInfo:I,configDialogTitle:f,handleConfigDelete:C,handleConfigSave:$}}}),b=g,h=(a("7756"),a("2877")),v=a("c1d0"),y=a("eebe"),w=a.n(y),C=Object(h["a"])(b,o,n,!1,null,"675fd688",null);t["default"]=C.exports;w()(C,"components",{QSlider:v["a"]})},6017:function(e,t,a){},"618b":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pa-md container",staticStyle:{height:"620px"}},[a("div",{staticStyle:{display:"flex","flex-direction":"column","justify-content":"center","align-items":"center"}},[a("el-form",{staticClass:"w-full",attrs:{"label-position":"top","label-width":"200px"}},[a("el-form-item",[a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.remark,callback:function(t){e.remark=t},expression:"remark"}})],1),a("el-form-item",{staticClass:"mt-10"},[a("el-button",{attrs:{type:"primary"},on:{click:e.handleSave}},[e._v(e._s(e.$t("service.save")))])],1)],1)],1)])},n=[],i=a("750b"),s=(a("ac79"),a("1840")),l=a("1f2a"),r=a("3faa"),c=a("86c4"),d=(a("db56"),a("6eb7")),u=a("b850"),p=a("8ee3"),m=a("fadb"),f=Object(i["defineComponent"])({name:"Login",data(){return{isPwd:!0,isNetWrok:!0,isMobile:Object(m["a"])()}},mounted(){Object(m["b"])(this,"isMobile")},setup(e,{root:t}){Object(i["computed"])(u["b"].currentUser);const{mutate:a}=Object(s["useMutation"])(c["d"]),{mutate:o}=Object(s["useMutation"])(c["g"]),{mutate:n}=Object(s["useMutation"])(r["a"]),{mutate:m}=Object(s["useMutation"])(r["b"]),f=Object(i["reactive"])({id:0,chatAiName:"",chatAiGreeting:"",chatAiAvatarUrl:"",chatAiPeroration:"",rechargeReminder:""}),g=Object(i["ref"])(""),b=async e=>{const t=await Object(p["a"])(e.file);return f.chatAiAvatarUrl=t.fileUrl,t.fileUrl},h=async()=>{const e={desc:g.value},a=await o({id:Number(sessionStorage.getItem("legalDocumentProjectId")),legalDocumentProject:e});a&&(l["a"].$emit("updateRemark"),d["a"].success(t.$t("notify.Done")))};return Object(i["onMounted"])((()=>{l["a"].$on("switchNewProject",(e=>{g.value=e.desc}))})),{handleSave:h,beforeupload:b,userInfo:f,remark:g}}}),g=f,b=(a("a00f"),a("2877")),h=Object(b["a"])(g,o,n,!1,null,"7f41c956",null);t["default"]=h.exports},"61fa":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"endpoint-node"},[e.judge("1")?a("butterfly-vue-endpoint",{attrs:{id:"1",param:{scope:"endpoint-1",limitNum:2}}}):e._e(),e.judge("2")?a("butterfly-vue-endpoint",{attrs:{id:"2",className:"endpoint-2"},on:{click:e.handleClick}}):e._e(),e.judge("3")?a("butterfly-vue-endpoint",{attrs:{id:"3",className:"endpoint-3"}},[a("el-tag",{on:{click:e.handleClick1}},[e._v("endpoint")])],1):e._e(),e.judge("4")?a("el-row",[a("butterfly-vue-endpoint",{attrs:{id:"4",className:"endpoint-4"}},[a("el-button",{on:{click:e.handleClick1}},[e._v("endpoint")])],1)],1):e._e(),e.judge("5")?a("v-card",{attrs:{"max-width":"344"}},[a("butterfly-vue-endpoint",{attrs:{id:"5",className:"endpoint-5",param:{scope:"endpoint-1",limitNum:3}}},[e._v("\n      content\n    ")])],1):e._e()],1)},n=[],i=(a("caad"),a("b635")),s={name:"endpoint-node",components:{ButterflyVueEndpoint:i["b"]},props:{itemData:{type:Object},canvasNode:{type:Object}},methods:{judge(e){return this.itemData.userData.endpoints.includes(e)},handleClick(){console.log(1)},handleClick1(){console.log(2)}},created(){}},l=s,r=(a("d03f"),a("2877")),c=Object(r["a"])(l,o,n,!1,null,"3d5a779a",null);t["default"]=c.exports},6560:function(e,t,a){"use strict";a.d(t,"h",(function(){return n})),a.d(t,"b",(function(){return i})),a.d(t,"g",(function(){return s})),a.d(t,"f",(function(){return l})),a.d(t,"e",(function(){return r})),a.d(t,"c",(function(){return c})),a.d(t,"d",(function(){return d})),a.d(t,"a",(function(){return u}));var o=a("5184");const n=o["a"]`
mutation updatePaperwork ($id: Int!,$paperwork: PaperworkUpdateInput!)  {
    updatePaperwork(id: $id,paperwork: $paperwork){
        id
    }
  }
`,i=o["a"]`
query getPaperworkGenerateWebofficeToken ($id: Int!)  {
    getPaperworkGenerateWebofficeToken(id: $id)
  }
`,s=o["a"]`
mutation sendPaperworkToWxUser ($id: Int!)  {
    sendPaperworkToWxUser(id: $id)
  }
`,l=o["a"]`
query refreshWebofficeToken ($accessToken: String!,$refreshToken: String!)  {
    refreshWebofficeToken(accessToken: $accessToken,refreshToken: $refreshToken)
  }
`,r=o["a"]`
mutation notiPaperworkToWxUser ($id: Int!)  {
    notiPaperworkToWxUser(id: $id)
  }
`,c=o["a"]`
query getPaperworks{
    getPaperworks {
        id
        legalDocumentProject{
            name
            legalDocumentTemplates{
                fileUrl
            }
        }
        state
        docJson
        fileUrl
        chatJson
        errorInfo
        confirmedAt
        dataJson
        reviewDocJson
        wxUser{
            id
            name
            avatarUrl
            openId
        }
        wxPaidOrders{
            out_trade_no
            commodity{
            name
            }
        }
        aiFileUrl
  }
}
`,d=o["a"]`
query getPaperworksAndCount ($take: Int!,$skip: Int!,$state: String!,$out_trade_no: String){
    getPaperworksAndCount (take: $take,skip: $skip,state: $state,out_trade_no: $out_trade_no) {
     totalCount
        data{
        id
        legalDocumentProject{
            name
            legalDocumentTemplates{
                fileUrl
            }
        }
        state
        docJson
        fileUrl
        chatJson
        errorInfo
        confirmedAt
        dataJson
        reviewDocJson
        wxUser{
            id
            name
            avatarUrl
            openId
        }
        wxPaidOrders{
            out_trade_no
            commodity{
            name
            }
        }
        aiFileUrl
}
  }
}
`,u=o["a"]`
query getPaperworkById($id: Int!){
    getPaperworkById(id: $id) {
        id
        legalDocumentProject{
            name
            legalDocumentTemplates{
                fileUrl
            }
        }
        state
        docJson
        fileUrl
        chatJson
        dataJson
        errorInfo
        confirmedAt
        reviewDocJson
        wxUser{
            id
            name
            avatarUrl
            openId
        }
        wxPaidOrders{
            out_trade_no
        }
  }
}
`},"675b":function(e,t,a){},"6ece":function(e,t,a){"use strict";var o=a("995b"),n=a.n(o);const i=a("1157");class s extends n.a.Endpoint{draw(e){let t=super.draw(e);return e.options&&e.options.color&&i(t).addClass(e.options.color),t}}var l=s;t["a"]=()=>[{id:"left",color:"green",orientation:[-1,0],pos:[0,.5],Class:l},{id:"right",color:"green",orientation:[1,0],pos:[0,.5],Class:l}]},"736d":function(e,t,a){"use strict";a("2dc0")},7756:function(e,t,a){"use strict";a("26ef")},"7c72":function(e,t,a){"use strict";a("b91b")},"7dfa":function(e,t,a){},"7f1b":function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var o=a("5184");const n=o["a"]`
query getZhiPuAllKb  {
    getZhiPuAllKb 
}
`},"83f9":function(e,t,a){"use strict";a("2509")},"86b2":function(e,t,a){},"86c4":function(e,t,a){"use strict";a.d(t,"e",(function(){return n})),a.d(t,"d",(function(){return i})),a.d(t,"g",(function(){return s})),a.d(t,"h",(function(){return l})),a.d(t,"i",(function(){return r})),a.d(t,"f",(function(){return c})),a.d(t,"c",(function(){return d})),a.d(t,"a",(function(){return u})),a.d(t,"b",(function(){return p}));var o=a("5184");const n=o["a"]`
query getLegalDocumentProjects {
    getLegalDocumentProjects{
      id
      name
      desc
      isConsult
      creator{
      id
      }
    }
  }
`,i=o["a"]`
query getLegalDocumentProject ($id:Int!) {
    getLegalDocumentProject(id:$id){
      id
      name
      desc
      chatAiName
      chatAiGreeting
      llmCfgKbx
      llmCfgQos
      llmCfgCki
      llmCfgAsk
      llmCfgDoc
      nextCkiLabel
      nextCkiDesc 
      model
      character_desc
      temperature
      top_p
      max_tokens
      kbId
      charDescLaw
      charDescQos
      charDescCki
      promptKbx
      promptQos
      promptCki
      turnsAsk
      turnsRpt
      promptAsk
      promptAskLast
      prompt_doc
      chardesc_doc
      reference_doc
      charDescAsk
      isConsult
      qrCodeUrl
      chatAiGreeting
      chatAiAvatarUrl
      legalDocumentTemplates{
         id
        fileName
        fileUrl
      }
      creator{
      id
      }
      chatAiPeroration
      rechargeReminder
      members{
        id
        name
        role
        avatarUrl
      }
      testers{
          id
        name
    avatarUrl
    openId
    lastOperateDate
    lastPayDate
      }
    }
  }
`,s=o["a"]`
  mutation updateLegalDocumentProject($id:Int!,$legalDocumentProject: LegalDocumentProjectUpdateInput!) {
    updateLegalDocumentProject(id:$id,legalDocumentProject: $legalDocumentProject) {
      id
      name
    }
  }
`,l=o["a"]`
  mutation updateLegalDocumentProjectMembers($id:Int!,$memberIds: [String!]!) {
    updateLegalDocumentProjectMembers(id:$id,memberIds: $memberIds) {
      id
      name
    }
  }
`,r=o["a"]`
  mutation updateLegalDocumentProjectTesters($id:Int!,$testerIds: [String!]!) {
    updateLegalDocumentProjectTesters(id:$id,testerIds: $testerIds) {
      id
      name
    }
  }
`,c=o["a"]`
query getUserOperators{
  getUserOperators{
    id
    name
    email
    phone
    role
    avatarUrl
    createdAt
    updatedAt
  }
}
`,d=o["a"]`
  mutation deleteLegalDocumentProject($id: Int!) {
    deleteLegalDocumentProject(id: $id)
  }
  `,u=o["a"]`
  mutation copyLegalDocumentProject($projectName: String!,$id: Int!) {
    copyLegalDocumentProject(projectName: $projectName,id: $id){
        id
    }
  }
  `,p=o["a"]`
mutation createLegalDocumentProject($legalDocumentProject: LegalDocumentProjectInput!) {
    createLegalDocumentProject(legalDocumentProject: $legalDocumentProject) {
        id
    }
  }
`},"86cd":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pa-md container"},[a("div",{staticStyle:{width:"100%",margin:"15px 0",display:"flex","justify-content":"space-between"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:e.$t("People.searchForName")},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),a("el-button",{attrs:{type:"primary"},on:{click:e.addMember}},[e._v("\n      "+e._s(e.$t("Members.addMember"))+"\n    ")])],1),a("div",[a("el-table",{staticClass:"mb-5",staticStyle:{width:"100%"},attrs:{data:e.tableData.filter((function(t){return!e.searchValue||t.name.toLowerCase().includes(e.searchValue.toLowerCase())})),"show-header":!1,loading:e.Loading,"empty-text":e.$t("People.noData")}},[a("el-table-column",{attrs:{label:e.$t("People.User"),align:"center","min-width":"100%"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticStyle:{width:"100%",display:"flex","align-items":"center","justify-content":"left","margin-left":"10px"}},[a("j-avatar",{staticClass:"shadow-outline-white -ml-1",attrs:{size:28,avatarUrl:t.row.avatarUrl,name:"xxxxx"}}),a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.name))])],1)]}}])}),a("el-table-column",{attrs:{label:e.$t("People.action"),align:"center","min-width":"180%"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("\n            "+e._s(e.$t("Members.remove"))+"\n          ")])]}}])})],1)],1),a("el-dialog",{staticClass:"channel-dialog",attrs:{"close-on-click-modal":!1,visible:e.dialogPeopleVisible,title:e.createOrEditTitle,width:e.isMobile?"calc(100vw - 54px)":"calc(55% - 260px)","append-to-body":!0},on:{"update:visible":function(t){e.dialogPeopleVisible=t}}},[a("el-form",{ref:"peopleForm",attrs:{model:e.peopleConfigMessage,rules:e.peopleRules,"label-width":"80px","label-position":"top"}},[a("el-form-item",{attrs:{label:e.$t("People.userName"),prop:"name"}},[a("el-input",{staticClass:"channel-input",attrs:{"validate-event":!1,autocomplete:"off"},model:{value:e.peopleConfigMessage.name,callback:function(t){e.$set(e.peopleConfigMessage,"name",t)},expression:"peopleConfigMessage.name"}})],1),a("el-form-item",{attrs:{label:e.$t("People.Phone"),prop:"phone"}},[a("el-input",{staticClass:"channel-input",attrs:{"validate-event":!1,autocomplete:"off"},model:{value:e.peopleConfigMessage.phone,callback:function(t){e.$set(e.peopleConfigMessage,"phone",t)},expression:"peopleConfigMessage.phone"}})],1),a("el-form-item",{attrs:{label:e.$t("People.email"),prop:"email"}},[a("el-input",{staticClass:"channel-input",attrs:{"validate-event":!1,autocomplete:"off"},model:{value:e.peopleConfigMessage.email,callback:function(t){e.$set(e.peopleConfigMessage,"email",t)},expression:"peopleConfigMessage.email"}})],1),e.createOrEditTitle==e.$t("People.add")?a("el-form-item",{attrs:{label:e.$t("People.InitialPassword"),prop:"password",rules:[{required:!0,message:e.$t("People.userInitialPassword"),trigger:"blur"}]}},[a("el-input",{staticClass:"channel-input",attrs:{"validate-event":!1,autocomplete:"off"},model:{value:e.peopleConfigMessage.password,callback:function(t){e.$set(e.peopleConfigMessage,"password",t)},expression:"peopleConfigMessage.password"}})],1):e._e(),a("el-form-item",{attrs:{label:e.$t("People.Authority"),prop:"role"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:e.$t("People.PleaseSelect")},model:{value:e.peopleConfigMessage.role,callback:function(t){e.$set(e.peopleConfigMessage,"role",t)},expression:"peopleConfigMessage.role"}},e._l(e.roleOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogPeopleVisible=!1}}},[e._v(e._s(e.$t("People.cancel")))]),a("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmitMessage}},[e._v(e._s(e.$t("People.confirm")))])],1)],1),a("el-dialog",{attrs:{title:e.$t("Members.addMember"),"close-on-click-modal":!1,width:"60%",visible:e.dialogAddFormVisible},on:{"update:visible":function(t){e.dialogAddFormVisible=t}}},[a("div",{staticStyle:{width:"100%",margin:"15px 0",display:"flex","justify-content":"space-between"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:e.$t("People.searchForName")},on:{input:e.handleInputSearch},model:{value:e.searchPeopleValue,callback:function(t){e.searchPeopleValue=t},expression:"searchPeopleValue"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})])],1),a("div",[a("el-table",{ref:"multipleTable",staticClass:"mb-5",staticStyle:{width:"100%"},attrs:{data:e.wxUserData,border:"",loading:e.Loading,"empty-text":e.$t("People.noData")},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{label:e.$t("People.User"),align:"center","min-width":"100%"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticStyle:{width:"100%",display:"flex","align-items":"center","justify-content":"left","margin-left":"10px"}},[a("j-avatar",{staticClass:"shadow-outline-white -ml-1",attrs:{size:28,avatarUrl:t.row.avatarUrl,name:"xxxxx"}}),a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.name))])],1)]}}])}),a("el-table-column",{attrs:{prop:"lastPayDate",label:e.$t("People.Whethertopay"),align:"center",formatter:e.isPay,"min-width":"100%"}}),a("el-table-column",{attrs:{prop:"createdAt",label:e.$t("People.Authorizationtime"),align:"center","min-width":"165%"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(null==t.row.createdAt?"":e.formatterTime(t.row.createdAt))+"\n          ")]}}])}),a("el-table-column",{attrs:{prop:"lastOperateDate",label:e.$t("People.Recentconversationtime"),align:"center","min-width":"165%"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(null==t.row.lastOperateDate?"":e.formatterTime(t.row.lastOperateDate))+"\n          ")]}}])})],1),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[5,10,20,50],"page-size":e.pageSize,total:e.total,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogAddFormVisible=!1}}},[e._v(e._s(e.$t("profile.Cancel")))]),a("el-button",{attrs:{type:"primary"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("profile.Confirm")))])],1)])],1)},n=[],i=a("750b"),s=a("b850"),l=a("1840"),r=a("5a0c"),c=a.n(r),d=a("ac79"),u=a("6eb7"),p=a("436b"),m=a("1f2a"),f=a("ef50"),g=a("86c4"),b=a("fadb"),h=Object(i["defineComponent"])({data(){return{isMobile:Object(b["a"])()}},mounted(){Object(b["b"])(this,"isMobile")},setup(e,{root:t}){const a=Object(i["ref"])(!1),o=Object(i["ref"])([]),n=Object(i["ref"])([]),r=Object(i["ref"])([]),{mutate:b}=Object(l["useMutation"])(f["g"]),{mutate:h}=Object(l["useMutation"])(g["d"]),{mutate:v}=Object(l["useMutation"])(g["i"]),y=e=>e.lastPayDate?t.$t("People.yes"):t.$t("People.no"),w=Object(i["ref"])(0),C=Object(i["ref"])(""),$=async()=>{try{a.value=!0;const e=await b({take:ee.value,skip:(X.value-1)*ee.value,name:C.value});e&&(n.value=e.data.getWxUsersAndCount.data,w.value=e.data.getWxUsersAndCount.totalCount,a.value=!1,console.log(n.value))}catch(e){console.log("----------getPeople error")}},{mutate:D}=Object(l["useMutation"])(g["f"]),{mutate:k}=Object(l["useMutation"])(f["d"]),x=async()=>{try{a.value=!0;const{data:{getUsers:e}}=await k();o.value=e,r.value=e,a.value=!1,console.log(r.value)}catch(e){console.log("----------getPeople error")}},I=Object(i["ref"])(!1),_=async()=>{const e=await h({id:Number(sessionStorage.getItem("legalDocumentProjectId"))});e&&(r.value=e.data.getLegalDocumentProject.testers)},j=(e,t="YYYY/MM/DD  HH:mm:ss")=>e?c()(e).format(t):e,S=e=>{let t=j(e);return t},A=Object(i["ref"])([]),N=e=>{A.value=e},O=e=>{switch(e.role){case 1:return t.$t("People.Administrators");case 2:return t.$t("People.Lawyer");case 3:return t.$t("People.Operator");case 4:return t.$t("People.Finance");case 5:return t.$t("People.Distributor");case 6:return t.$t("People.DistributorAdmin")}},M=[{value:1,label:t.$t("People.Administrators")},{value:2,label:t.$t("People.Lawyer")},{value:3,label:t.$t("People.Operator")},{value:4,label:t.$t("People.Finance")},{value:5,label:t.$t("People.Distributor")},{value:6,label:t.$t("People.DistributorAdmin")}],P=Object(i["ref"])(!1),E=Object(i["ref"])(""),L=Object(i["ref"])({name:"",email:"",phone:"",avatarUrl:"https://file.sflow.pro/avatar_default.png",role:1}),T=()=>{E.value=t.$t("People.add"),L.value={...L.value,name:"",email:"",phone:"",password:"",role:1},P.value=!0},U=Object(i["ref"])([]),R=async()=>{const e=await D();e&&(U.value=e.data.getUserOperators)},q=async()=>{$(),I.value=!0},B=async()=>{let e=[];A.value.forEach((t=>{e.push(t.id)})),r.value.forEach((t=>{e.push(t.id)}));const a=await v({id:Number(sessionStorage.getItem("legalDocumentProjectId")),testerIds:e});a&&(I.value=!1,_(),u["a"].success(t.$t("People.succeed")))},F=Object(i["ref"])(""),z=(e,a)=>{E.value=t.$t("People.edit"),L.value={name:a.name,email:a.email,phone:a.phone,avatarUrl:a.avatarUrl,role:a.role},F.value=a.id,console.log(F.value),P.value=!0},Q=Object(i["ref"])(null),W={name:[{required:!0,message:t.$t("People.userNameMessage"),trigger:"blur"}],phone:[{required:!0,message:t.$t("People.userPhoneMessage"),trigger:"blur"}],email:[{required:!0,message:t.$t("People.userEmailMessage"),trigger:"blur"}]},{mutate:V}=Object(l["useMutation"])(f["a"]),{mutate:J}=Object(l["useMutation"])(f["i"]),Y=()=>{Q.value&&Q.value.validate((async e=>{if(e){if(!d["a"].isEmail(L.value.email))return void u["a"].error(t.$t("People.EmailWrong"));if(!d["a"].isMobile(L.value.phone))return void u["a"].error(t.$t("People.PhoneWrong"));try{if(E.value==t.$t("People.add")){const e=await V({user:L.value});console.log(e),x(),u["a"].success(t.$t("People.succeed"))}else{const e=await J({user:L.value,userId:F.value});console.log(e),x(),u["a"].success(t.$t("People.succeed"))}P.value=!1,L.value={name:"",email:"",phone:"",avatarUrl:"https://file.sflow.pro/avatar_default.png"},console.log(L.value)}catch(a){u["a"].error(a.message)}}}))},{mutate:G}=Object(l["useMutation"])(f["b"]),Z=async(e,a)=>{p["a"].create({title:t.$t("People.confirm"),message:t.$t("People.confirmMessage"),ok:{label:t.$t("People.confirm"),noCaps:!0},cancel:{label:t.$t("People.cancel"),noCaps:!0,flat:!0},style:{zIndex:10002}}).onOk((async()=>{let e=[];r.value=r.value.filter((e=>e.id!==a.id)),r.value.forEach((t=>{e.push(t.id)}));const o=await v({id:Number(sessionStorage.getItem("legalDocumentProjectId")),testerIds:e});o&&(I.value=!1,_(),u["a"].success(t.$t("People.succeed")))}))},K=Object(i["computed"])(s["b"].currentUser),H=()=>{$()},X=Object(i["ref"])(1),ee=Object(i["ref"])(10),te=e=>{ee.value=e,$()},ae=e=>{X.value=e,$()};return Object(i["onMounted"])((()=>{m["a"].$on("switchNewProject",(e=>{r.value=e.testers}))})),{tableData:r,total:w,searchPeopleValue:C,wxUserData:n,searchValue:"",currentUser:K,search:"",handleAdd:B,isPay:y,dialogAddFormVisible:I,handleInputSearch:H,alloperators:U,addMember:q,getoperators:R,currentPage:X,handleSelectionChange:N,multipleSelection:A,pageSize:ee,handleSizeChange:te,handleCurrentChange:ae,formatterTime:S,formatterRole:O,roleOptions:M,dialogPeopleVisible:P,createOrEditTitle:E,peopleConfigMessage:L,peopleRules:W,peopleForm:Q,handleCreate:T,handleEdit:z,handleDelete:Z,handleSubmitMessage:Y,Loading:a}}}),v=h,y=a("2877"),w=Object(y["a"])(v,o,n,!1,null,"0129b0a7",null);t["default"]=w.exports},8796:function(e,t,a){},"8b2d":function(e,t){e.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcwMzA2NTA2MDg0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1MDUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg2MiA5MDJjMCAxNi41NjktMTMuNDMxIDMwLTMwIDMwSDE5MmMtMTYuNTY5IDAtMzAtMTMuNDMxLTMwLTMwVjEyMmMwLTE2LjU2OSAxMy40MzEtMzAgMzAtMzBoNDc2bDE5NCAxOTR2NjE2eiIgZmlsbD0iIzQ4OTVGRiIgcC1pZD0iMTUwNiI+PC9wYXRoPjxwYXRoIGQ9Ik04NjIgMjg2SDY5OGMtMTYuNTY5IDAtMzAtMTMuNDMxLTMwLTMwVjkyIiBmaWxsPSIjRkZGRkZGIiBmaWxsLW9wYWNpdHk9Ii4yOTYiIHAtaWQ9IjE1MDciPjwvcGF0aD48cGF0aCBkPSJNMzYxLjgxIDcwM2g5My4xbDUzLjQxLTIxNS42aDIuOTRMNTYzLjY5IDcwM2g5My4xbDc3LjkxLTM0MC4wNmgtNzYuOTNsLTQ5Ljk4IDI1MS4zN2gtMi45NGwtNDktMjE4LjU0aC04Ni4yNGwtNTEuOTQgMjE4LjU0aC0yLjk0bC00OS0yNTEuMzdoLTc3LjkxeiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iMTUwOCI+PC9wYXRoPjwvc3ZnPg=="},"8c1b":function(e,t,a){"use strict";var o=a("a567"),n=a("4aa3");const i={id:"left",orientation:[-1,0],pos:[0,.5]},s={id:"top",orientation:[0,-1],pos:[.5,0]},l={id:"right",orientation:[1,0],pos:[0,.5]},r={id:"bottom",orientation:[0,1],pos:[.5,0]};t["a"]={groups:[],nodes:[{id:"0",top:10,left:370,render:o["default"],endpoints:[r],userData:{content:"Fire Incident",width:100}},{id:"1",top:110,left:350,render:o["default"],endpoints:[i,s,l,r],userData:{content:"Auto alarm activated"}},{id:"2",top:110,left:50,render:o["default"],endpoints:[l,r],userData:{content:"Employees manua…"}},{id:"3",top:110,left:700,render:o["default"],endpoints:[i,r],userData:{content:"Actiate evacuation"}},{id:"4",top:210,left:350,render:o["default"],endpoints:[i,s,r],userData:{content:"Alarm monitoring service…"}},{id:"5",top:210,left:50,render:o["default"],endpoints:[s,l],userData:{content:"Employees informs pri…"}},{id:"6",top:190,left:700,render:o["default"],endpoints:[s,r],userData:{content:"Evacuees report …"}},{id:"7",top:280,left:700,render:o["default"],endpoints:[s,r],userData:{content:"Roll call taken by …"}},{id:"8",top:370,left:700,render:o["default"],endpoints:[s],userData:{content:"Floor Marshals brief…"}},{id:"9",top:310,left:200,render:o["default"],endpoints:[s,r],userData:{content:"Primary contact con…"}},{id:"10",top:410,left:200,render:o["default"],endpoints:[s,r],userData:{content:"Primary contect infor…"}},{id:"11",top:510,left:200,render:o["default"],endpoints:[s],userData:{content:"Emergency response…"}},{id:"12",top:310,left:500,render:o["default"],endpoints:[s,r],userData:{content:"Primary contact fire…"}},{id:"13",top:410,left:500,render:o["default"],endpoints:[s,r],userData:{content:"Service Provider…"}},{id:"14",top:510,left:500,render:o["default"],endpoints:[s],userData:{content:"Fire Engines arr…"}}],edges:[{id:"0.bottom-1.top",sourceNode:"0",targetNode:"1",source:"bottom",target:"top"},{id:"1.left-2.right",sourceNode:"1",targetNode:"2",source:"left",target:"right",arrowPosition:.7,render:n["default"],userData:{content:"no"}},{id:"1.right-3.left",sourceNode:"1",targetNode:"3",source:"right",target:"left"},{id:"1.bottom-4.top",sourceNode:"1",targetNode:"4",source:"bottom",target:"top",arrowPosition:.8,render:n["default"],userData:{content:"Yes"}},{id:"2.bottom-5.top",sourceNode:"2",targetNode:"5",source:"bottom",target:"top"},{id:"5.right-4.left",sourceNode:"5",targetNode:"4",source:"right",target:"left"},{id:"3.bottom-6.top",sourceNode:"3",targetNode:"6",source:"bottom",target:"top"},{id:"6.bottom-7.top",sourceNode:"6",targetNode:"7",source:"bottom",target:"top"},{id:"7.bottom-8.top",sourceNode:"7",targetNode:"8",source:"bottom",target:"top"},{id:"9.bottom-10.top",sourceNode:"9",targetNode:"10",source:"bottom",target:"top"},{id:"10.bottom-11.top",sourceNode:"10",targetNode:"11",source:"bottom",target:"top"},{id:"12.bottom-13.top",sourceNode:"12",targetNode:"13",source:"bottom",target:"top"},{id:"13.bottom-14.top",sourceNode:"13",targetNode:"14",source:"bottom",target:"top"},{id:"4.bottom-9.top",sourceNode:"4",targetNode:"9",source:"bottom",target:"top",shapeType:"AdvancedBezier"},{id:"4.bottom-12.top",sourceNode:"4",targetNode:"12",source:"bottom",target:"top",shapeType:"AdvancedBezier"}]}},"8ee3":function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));a("5319"),a("5b81");var o=a("ec26"),n=a("8fb4"),i=a("5184");a("d2d9");i["a"]`
  mutation getShareFileMapping($shareUUID: String!) {
    getShareFileMapping(shareUUID: $shareUUID)
  }
`,i["a"]`
  mutation createShareFileMapping(
    $shareTime: Int!
    $type: String!
    $projectId: Int!
    $emails: [String!]!
    $netdiskId: Int!
  ) {
    createShareFileMapping(
      shareTime: $shareTime
      type: $type
      projectId: $projectId
      emails: $emails
      netdiskId: $netdiskId
    )
  }
`,i["a"]`
  query getTemporaryAliOSSConfig {
    getTemporaryAliOSSConfig
  }
`,i["a"]`
  query getTemporaryOSSConfig($vendor: String!) {
    getTemporaryOSSConfig(vendor: $vendor)
  }
`;a("77d2");const s=a("9b15"),l={uploadHost:"https://file.sflow.pro",ossParams:{region:"oss-us-west-1",success_action_status:"200",accessKeyId:"",accessKeySecret:"",bucket:"sflow-repo-us",endpoint:"https://file.sflow.pro",cname:!0}};function r(e){return new Promise((async(t,a)=>{const i=await Object(n["b"])(),r=JSON.parse("{"+i+"}"),c=r.AccessKeyId,d=r.AccessKeySecret,u=r.SecurityToken,p=e.name.substring(e.name.lastIndexOf(".")),m=(e.name.slice(0,e.name.lastIndexOf(".")),Object(o["a"])().toString().replaceAll("-","")),f=m.substring(0,1)+"/"+m.substring(1,2)+"/"+m.substring(2)+p.replace(/\s*/g,"").replace("+","");let g=new s({region:l.ossParams.region,accessKeyId:c,accessKeySecret:d,stsToken:u,bucket:l.ossParams.bucket});await g.multipartUpload(f,e);t({fileUrl:`${l.uploadHost}/${f}`,fileName:f,Name:e.name})}))}},"8f19":function(e,t,a){"use strict";a("7dfa")},9103:function(e,t){e.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcwMzA2NTExNTQ3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2NTAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg2MiA5MDJjMCAxNi41NjktMTMuNDMxIDMwLTMwIDMwSDE5MmMtMTYuNTY5IDAtMzAtMTMuNDMxLTMwLTMwVjEyMmMwLTE2LjU2OSAxMy40MzEtMzAgMzAtMzBoNDc2bDE5NCAxOTR2NjE2eiIgZmlsbD0iI0ZGNjM1OSIgcC1pZD0iMTY1MSI+PC9wYXRoPjxwYXRoIGQ9Ik04NjIgMjg2SDY5OGMtMTYuNTY5IDAtMzAtMTMuNDMxLTMwLTMwVjkyIiBmaWxsPSIjRkZGRkZGIiBmaWxsLW9wYWNpdHk9Ii4yOTYiIHAtaWQ9IjE2NTIiPjwvcGF0aD48cGF0aCBkPSJNMjM0LjY0IDY0MWg0OC42NHYtNjguNDhoMjcuMmM2Mi43MiAwIDg3LjM2LTIwLjE2IDg3LjM2LTc4LjA4IDAtNTMuNDQtMjAuOC03NS41Mi04Ny4zNi03NS41MmgtNzUuODRWNjQxeiBtNDguNjQtMTA3LjUydi03Ni4xNmgyMC44YzMyLjY0IDAgNDQuMTYgOS42IDQ0LjE2IDM4LjA4IDAgMjkuNDQtMTEuMiAzOC4wOC00NC4xNiAzOC4wOGgtMjAuOHpNNDM3LjUyIDQxOC45MlY2NDFoNzYuMTZjNjUuMjggMCAxMDguMTYtMjUuMjggMTA4LjE2LTExMS4wNCAwLTkyLjQ4LTQyLjg4LTExMS4wNC0xMDguMTYtMTExLjA0aC03Ni4xNnogbTQ4LjY0IDE4MC40OFY0NTkuODhoMjQuOTZjNDAgMCA2MC40OCAxMi44IDYwLjQ4IDcwLjA4IDAgNTQuMDgtMTkuNTIgNjkuNDQtNjAuNDggNjkuNDRoLTI0Ljk2ek04MDEuMzYgNDYxLjE2di00Mi4yNEg2NjUuNjhWNjQxaDQ4LjY0di04Ni40aDgwLjY0di00MS45MmgtODAuNjR2LTUxLjUyeiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iMTY1MyI+PC9wYXRoPjwvc3ZnPg=="},"94ed":function(e,t,a){},"9b01":function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return s}));var o=a("5184");const n=o["a"]`
query getWxPaidOrders   {
    getWxPaidOrders {
                id
        out_trade_no
        total
        wxUserId
        success_time
        createdAt
        t1_share
        t2_share
        state
         commodity{
              name 
            }
        wxUser{
            name
           
            avatarUrl
             distributorId
            distributor{
              name 
              t1Distributor{
              name
              }
            }
        }
    } 
}
`,i=o["a"]`
query getWxPaidOrdersAndCount($take: Int!,$skip: Int!)   {
    getWxPaidOrdersAndCount(take: $take,skip: $skip) {
     totalCount
        data{
        id
        out_trade_no
        total
        wxUserId
        success_time
        createdAt
        t1_share
        t2_share
        state
         commodity{
              name 
            }
        wxUser{
            name
           
            avatarUrl
             distributorId
            distributor{
              name 
              t1Distributor{
              name
              }
            }
        }
}
    } 
}
`,s=o["a"]`
query getSelfWxPaidOrders($openid: String!)   {
    getSelfWxPaidOrders( openid: $openid) {
        id
        out_trade_no
        total
        wxUserId
        success_time
        state
        createdAt
    } 
}
`},a00f:function(e,t,a){"use strict";a("675b")},a310:function(e,t,a){},a567:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"emergency-node",style:"width:"+e.itemData.userData.width+"px"},[e._v("\n  "+e._s(e.itemData.userData.content)+"\n")])},n=[],i={name:"emergency-node",props:{itemData:{type:Object},canvasNode:{type:Object}},methods:{},created(){}},s=i,l=(a("3912"),a("2877")),r=Object(l["a"])(s,o,n,!1,null,"ac07d8d8",null);t["default"]=r.exports},a97a:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pa-md container"},[a("div",{staticStyle:{width:"100%",margin:"15px 0",display:"flex","justify-content":"space-between"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:e.$t("People.searchForName")},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),a("el-button",{attrs:{type:"primary"},on:{click:e.addMember}},[e._v("\n      "+e._s(e.$t("Members.addMember"))+"\n    ")])],1),a("div",[a("el-table",{staticClass:"mb-5",staticStyle:{width:"100%"},attrs:{data:e.tableData.filter((function(t){return!e.searchValue||t.name.toLowerCase().includes(e.searchValue.toLowerCase())})),"show-header":!1,loading:e.Loading,"empty-text":e.$t("People.noData")}},[a("el-table-column",{attrs:{label:e.$t("People.User"),align:"center","min-width":"100%"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticStyle:{width:"100%",display:"flex","align-items":"center","justify-content":"left","margin-left":"10px"}},[a("j-avatar",{staticClass:"shadow-outline-white -ml-1",attrs:{size:28,avatarUrl:t.row.avatarUrl,name:"xxxxx"}}),a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.name))])],1)]}}])}),a("el-table-column",{attrs:{label:e.$t("People.action"),align:"center","min-width":"180%"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("\n            "+e._s(e.$t("Members.remove"))+"\n          ")])]}}])})],1)],1),a("el-dialog",{staticClass:"channel-dialog",attrs:{"close-on-click-modal":!1,visible:e.dialogPeopleVisible,title:e.createOrEditTitle,width:e.isMobile?"calc(100vw - 54px)":"calc(55% - 260px)","append-to-body":!0},on:{"update:visible":function(t){e.dialogPeopleVisible=t}}},[a("el-form",{ref:"peopleForm",attrs:{model:e.peopleConfigMessage,rules:e.peopleRules,"label-width":"80px","label-position":"top"}},[a("el-form-item",{attrs:{label:e.$t("People.userName"),prop:"name"}},[a("el-input",{staticClass:"channel-input",attrs:{"validate-event":!1,autocomplete:"off"},model:{value:e.peopleConfigMessage.name,callback:function(t){e.$set(e.peopleConfigMessage,"name",t)},expression:"peopleConfigMessage.name"}})],1),a("el-form-item",{attrs:{label:e.$t("People.Phone"),prop:"phone"}},[a("el-input",{staticClass:"channel-input",attrs:{"validate-event":!1,autocomplete:"off"},model:{value:e.peopleConfigMessage.phone,callback:function(t){e.$set(e.peopleConfigMessage,"phone",t)},expression:"peopleConfigMessage.phone"}})],1),a("el-form-item",{attrs:{label:e.$t("People.email"),prop:"email"}},[a("el-input",{staticClass:"channel-input",attrs:{"validate-event":!1,autocomplete:"off"},model:{value:e.peopleConfigMessage.email,callback:function(t){e.$set(e.peopleConfigMessage,"email",t)},expression:"peopleConfigMessage.email"}})],1),e.createOrEditTitle==e.$t("People.add")?a("el-form-item",{attrs:{label:e.$t("People.InitialPassword"),prop:"password",rules:[{required:!0,message:e.$t("People.userInitialPassword"),trigger:"blur"}]}},[a("el-input",{staticClass:"channel-input",attrs:{"validate-event":!1,autocomplete:"off"},model:{value:e.peopleConfigMessage.password,callback:function(t){e.$set(e.peopleConfigMessage,"password",t)},expression:"peopleConfigMessage.password"}})],1):e._e(),a("el-form-item",{attrs:{label:e.$t("People.Authority"),prop:"role"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:e.$t("People.PleaseSelect")},model:{value:e.peopleConfigMessage.role,callback:function(t){e.$set(e.peopleConfigMessage,"role",t)},expression:"peopleConfigMessage.role"}},e._l(e.roleOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogPeopleVisible=!1}}},[e._v(e._s(e.$t("People.cancel")))]),a("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmitMessage}},[e._v(e._s(e.$t("People.confirm")))])],1)],1),a("el-dialog",{attrs:{title:e.$t("Members.addMember"),"close-on-click-modal":!1,width:"30%",visible:e.dialogAddFormVisible},on:{"update:visible":function(t){e.dialogAddFormVisible=t}}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:e.$t("People.searchForName")},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),a("el-table",{ref:"multipleTable",staticClass:"mb-5",staticStyle:{width:"100%"},attrs:{data:e.alloperators.filter((function(t){return!e.search||t.name.toLowerCase().includes(e.search.toLowerCase())})),"show-header":!1,loading:e.Loading,"empty-text":e.$t("People.noData")},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{label:e.$t("People.User"),align:"center","min-width":"100%"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticStyle:{width:"100%",display:"flex","align-items":"center","justify-content":"left","margin-left":"10px"}},[a("j-avatar",{staticClass:"shadow-outline-white -ml-1",attrs:{size:28,avatarUrl:t.row.avatarUrl,name:"xxxxx"}}),a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.name))])],1)]}}])})],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogAddFormVisible=!1}}},[e._v(e._s(e.$t("profile.Cancel")))]),a("el-button",{attrs:{type:"primary"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("profile.Confirm")))])],1)],1)],1)},n=[],i=a("750b"),s=a("b850"),l=a("1840"),r=a("5a0c"),c=a.n(r),d=a("ac79"),u=a("6eb7"),p=a("436b"),m=a("1f2a"),f=a("ef50"),g=a("86c4"),b=a("fadb"),h=Object(i["defineComponent"])({data(){return{isMobile:Object(b["a"])()}},mounted(){Object(b["b"])(this,"isMobile")},setup(e,{root:t}){const a=Object(i["ref"])(!1),o=Object(i["ref"])([]),n=Object(i["ref"])([]),{mutate:r}=Object(l["useMutation"])(g["d"]),{mutate:b}=Object(l["useMutation"])(g["h"]),{mutate:h}=Object(l["useMutation"])(g["f"]),{mutate:v}=Object(l["useMutation"])(f["d"]),y=async()=>{try{a.value=!0;const{data:{getUsers:e}}=await v();o.value=e,n.value=e,a.value=!1,console.log(n.value)}catch(e){console.log("----------getPeople error")}},w=Object(i["ref"])(!1),C=async()=>{const e=await r({id:Number(sessionStorage.getItem("legalDocumentProjectId"))});e&&(n.value=e.data.getLegalDocumentProject.members)},$=(e,t="YYYY/MM/DD  HH:mm:ss")=>e?c()(e).format(t):e,D=e=>{let t=$(e.createdAt);return t},k=Object(i["ref"])([]),x=e=>{k.value=e},I=e=>{switch(e.role){case 1:return t.$t("People.Administrators");case 2:return t.$t("People.Lawyer");case 3:return t.$t("People.Operator");case 4:return t.$t("People.Finance");case 5:return t.$t("People.Distributor");case 6:return t.$t("People.DistributorAdmin")}},_=[{value:1,label:t.$t("People.Administrators")},{value:2,label:t.$t("People.Lawyer")},{value:3,label:t.$t("People.Operator")},{value:4,label:t.$t("People.Finance")},{value:5,label:t.$t("People.Distributor")},{value:6,label:t.$t("People.DistributorAdmin")}],j=Object(i["ref"])(!1),S=Object(i["ref"])(""),A=Object(i["ref"])({name:"",email:"",phone:"",avatarUrl:"https://file.sflow.pro/avatar_default.png",role:1}),N=()=>{S.value=t.$t("People.add"),A.value={...A.value,name:"",email:"",phone:"",password:"",role:1},j.value=!0},O=Object(i["ref"])([]),M=async()=>{const e=await h();e&&(O.value=e.data.getUserOperators)},P=async()=>{M(),w.value=!0},E=async()=>{let e=[];k.value.forEach((t=>{e.push(t.id)})),n.value.forEach((t=>{e.push(t.id)}));const a=await b({id:Number(sessionStorage.getItem("legalDocumentProjectId")),memberIds:e});a&&(w.value=!1,C(),u["a"].success(t.$t("People.succeed")))},L=Object(i["ref"])(""),T=(e,a)=>{S.value=t.$t("People.edit"),A.value={name:a.name,email:a.email,phone:a.phone,avatarUrl:a.avatarUrl,role:a.role},L.value=a.id,console.log(L.value),j.value=!0},U=Object(i["ref"])(null),R={name:[{required:!0,message:t.$t("People.userNameMessage"),trigger:"blur"}],phone:[{required:!0,message:t.$t("People.userPhoneMessage"),trigger:"blur"}],email:[{required:!0,message:t.$t("People.userEmailMessage"),trigger:"blur"}]},{mutate:q}=Object(l["useMutation"])(f["a"]),{mutate:B}=Object(l["useMutation"])(f["i"]),F=()=>{U.value&&U.value.validate((async e=>{if(e){if(!d["a"].isEmail(A.value.email))return void u["a"].error(t.$t("People.EmailWrong"));if(!d["a"].isMobile(A.value.phone))return void u["a"].error(t.$t("People.PhoneWrong"));try{if(S.value==t.$t("People.add")){const e=await q({user:A.value});console.log(e),y(),u["a"].success(t.$t("People.succeed"))}else{const e=await B({user:A.value,userId:L.value});console.log(e),y(),u["a"].success(t.$t("People.succeed"))}j.value=!1,A.value={name:"",email:"",phone:"",avatarUrl:"https://file.sflow.pro/avatar_default.png"},console.log(A.value)}catch(a){u["a"].error(a.message)}}}))},{mutate:z}=Object(l["useMutation"])(f["b"]),Q=async(e,a)=>{p["a"].create({title:t.$t("People.confirm"),message:t.$t("People.confirmMessage"),ok:{label:t.$t("People.confirm"),noCaps:!0},cancel:{label:t.$t("People.cancel"),noCaps:!0,flat:!0},style:{zIndex:10002}}).onOk((async()=>{let e=[];n.value=n.value.filter((e=>e.id!==a.id)),n.value.forEach((t=>{e.push(t.id)}));const o=await b({id:Number(sessionStorage.getItem("legalDocumentProjectId")),memberIds:e});o&&(w.value=!1,C(),u["a"].success(t.$t("People.succeed")))}))},W=Object(i["computed"])(s["b"].currentUser),V=Object(i["ref"])(1),J=Object(i["ref"])(10),Y=e=>{J.value=e},G=e=>{V.value=e};return Object(i["onMounted"])((()=>{m["a"].$on("switchNewProject",(e=>{n.value=e.members}))})),{tableData:n,searchValue:"",search:"",handleAdd:E,currentUser:W,dialogAddFormVisible:w,alloperators:O,addMember:P,getoperators:M,currentPage:V,handleSelectionChange:x,multipleSelection:k,pageSize:J,handleSizeChange:Y,handleCurrentChange:G,formatterTime:D,formatterRole:I,roleOptions:_,dialogPeopleVisible:j,createOrEditTitle:S,peopleConfigMessage:A,peopleRules:R,peopleForm:U,handleCreate:N,handleEdit:T,handleDelete:Q,handleSubmitMessage:F,Loading:a}}}),v=h,y=a("2877"),w=Object(y["a"])(v,o,n,!1,null,"6a8122cf",null);t["default"]=w.exports},ab06:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticClass:"mt-3 ml-3",staticStyle:{height:"620px"}},[o("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:e.$t("action.search")},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}},[o("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),o("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:function(t){return e.addTemplate()}}},[e._v(e._s(e.$t("template.Add")))]),e._l(e.templateList.filter((function(t){return!e.search||t.fileName.toLowerCase().includes(e.search.toLowerCase())})),(function(t){return o("div",{key:t.id},[o("div",{staticClass:"mr-8 word_class mt-8",staticStyle:{float:"left","text-align":"center",width:"150px",height:"170px",position:"relative"}},[o("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"center","padding-top":"10px"}},[e.isDocxFile(t.fileUrl)?o("img",{staticStyle:{cursor:"pointer"},attrs:{src:a("8b2d"),width:"130",height:"130"},on:{click:function(a){return e.handleClickReview(t)}}}):o("img",{staticStyle:{cursor:"pointer"},attrs:{src:a("9103"),width:"130",height:"130"},on:{click:function(a){return e.handleClickReview(t)}}})]),o("div",{staticStyle:{width:"100%","text-align":"center"}},[o("div",{staticStyle:{height:"20px",overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis","text-align":"center"}},[o("span",[e._v(e._s(t.fileName.split(".")[0]))])])]),o("div",{staticClass:"more_icon",staticStyle:{position:"absolute",top:"2px",right:"5px",cursor:"pointer"}},[o("el-dropdown",{attrs:{trigger:"click"}},[o("i",{staticClass:"el-icon-more",staticStyle:{"font-size":"18px"}}),o("el-dropdown-menu",{staticStyle:{width:"100px"},attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-dropdown-item",{staticStyle:{margin:"0",padding:"0"},attrs:{command:"2"}},[o("div",{staticStyle:{width:"100%","text-align":"center"},on:{click:function(a){return e.handledelete(t)}}},[e._v("\n                  "+e._s(e.$t("action.delete"))+"\n                ")])])],1)],1)],1)])])}))],2),o("el-dialog",{attrs:{title:e.$t("template.Add"),"close-on-click-modal":!1,visible:e.uploadDialog,width:"30%","append-to-body":!0},on:{"update:visible":function(t){e.uploadDialog=t}}},[o("div",{staticStyle:{"font-size":"14px","margin-bottom":"8px"}},[e._v("\n      "+e._s(e.$t("upload.acceptType"))+"\n    ")]),o("el-upload",{staticClass:"upload-demo",attrs:{drag:"",action:"",accept:".pdf,.doc,.docx,",multiple:"","file-list":e.fileList,"http-request":e.uploadAttachment,width:"100%"}},[o("i",{staticClass:"el-icon-upload"}),o("div",{staticClass:"el-upload__text"},[e._v("\n        "+e._s(e.$t("upload.drag"))+" "),o("em",[e._v(" "+e._s(e.$t("upload.browse"))+" ")])])]),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.uploadDialog=!1}}},[e._v("\n        "+e._s(e.$t("action.cancel"))+"\n      ")]),o("el-button",{attrs:{type:"primary"},on:{click:e.handleCreate}},[e._v(e._s(e.$t("action.create")))])],1)],1),o("el-dialog",{attrs:{width:"70%","close-on-click-modal":!1,title:e.reviewItem.name,visible:e.reviewDialog,"modal-append-to-body":!1,"destroy-on-close":!0},on:{"update:visible":function(t){e.reviewDialog=t}}},[e.reviewItem.url?o("div",{staticClass:"column items-center"},[e.reviewItem.name.includes("doc")?o("iframe",{attrs:{src:"https://view.officeapps.live.com/op/view.aspx?src="+e.reviewItem.url,width:"100%",height:"700px"}}):o("iframe",{staticClass:"pdf-iframe pdf-iframe-preview",attrs:{src:""+e.reviewItem.url,width:"100%",height:"700px"}})]):o("div",[o("div",{domProps:{innerHTML:e._s(e.reviewItem.htmlText)}})])])],1)},n=[],i=a("750b"),s=(a("ac79"),a("1840")),l=(a("f53e"),a("db56"),a("6eb7")),r=a("5184");const c=r["a"]`
mutation createLegalDocument ($legalDocument: LegalDocumentInput!)  {
    createLegalDocument(legalDocument: $legalDocument) {
        fileName
      
}
  }
`,d=r["a"]`
mutation updateLegalDocument ($id: Int!,$legalDocument: LegalDocumentUpdateInput!)  {
    updateLegalDocument(id: $id,legalDocument: $legalDocument){
        fileName
    }
  }
`,u=r["a"]`
  mutation deleteLegalDocument($id: Int!) {
    deleteLegalDocument(id: $id)
  }
  `,p=r["a"]`
query getLegalDocuments ($legalDocumentProjectId: Int!) {
    getLegalDocuments (legalDocumentProjectId: $legalDocumentProjectId) {
        id
        fileName
        fileUrl
  }
}
`;a("cdde");var m=a("436b"),f=a("f508"),g=(a("b850"),a("8ee3")),b=a("1f2a"),h=a("fadb"),v=Object(i["defineComponent"])({name:"Login",data(){return{}},mounted(){Object(h["b"])(this,"isMobile")},setup(e,{root:t}){const{mutate:a}=Object(s["useMutation"])(c),o=Object(i["ref"])([]),{mutate:n}=Object(s["useMutation"])(p),{mutate:r}=Object(s["useMutation"])(u),{mutate:h}=Object(s["useMutation"])(d),v=Object(i["ref"])([]),y=Object(i["ref"])(!1),w=Object(i["ref"])(null),C=Object(i["reactive"])({name:"",url:"",size:0}),$=async()=>{w.value&&w.value.clearFiles();const e={fileName:C.name,fileUrl:C.url,size:C.size};e.legalDocumentProjectId=Number(sessionStorage.getItem("legalDocumentProjectId"));const o=await a({legalDocument:e});o&&(y.value=!1,I(),l["a"].success(t.$t("notify.Done")))},D=async e=>{m["a"].create({title:t.$t("action.delTip"),message:t.$t("action.delTipText"),ok:{color:"red",label:t.$t("action.delete"),noCaps:!0},cancel:{label:t.$t("action.cancel"),noCaps:!0,flat:!0},style:{zIndex:10002}}).onOk((async()=>{try{await r({id:Number(e.id)}),I(),l["a"].success(t.$t("notify.Done"))}catch(a){console.log("---------error",a),l["a"].error(a.message)}}))},k=Object(i["ref"])({name:"",url:""}),x=Object(i["ref"])(!1),I=async()=>{const e=await n({legalDocumentProjectId:Number(sessionStorage.getItem("legalDocumentProjectId"))});v.value=e.data.getLegalDocuments},_=e=>{k.value={url:e.fileUrl,name:e.fileName},x.value=!0},j=async e=>{let a=null;f["a"].show({message:t.$t("upload.loading")});try{console.log("111111111111uploadAttachment",e.file),a=await Object(g["a"])(e.file),C.name=e.file.name,C.url=a.fileUrl,f["a"].hide()}catch(o){l["a"].error(o.message)}},S=()=>{o.value=[],y.value=!0},A=e=>e.endsWith(".docx")||e.endsWith(".doc");return Object(i["onMounted"])((()=>{b["a"].$on("switchNewProject",(e=>{v.value=e.legalDocumentTemplates}))})),{isDocxFile:A,search:"",uploadAttachment:j,reviewDialog:x,templateList:v,uploadDialog:y,handledelete:D,fileInfo:C,upload_case:w,handleClickReview:_,reviewItem:k,addTemplate:S,handleCreate:$,fileList:o}},methods:{}}),y=v,w=(a("83f9"),a("d819"),a("2877")),C=Object(w["a"])(y,o,n,!1,null,"c668ee4e",null);t["default"]=C.exports},ac79:function(e,t,a){"use strict";const o=function(e){return/(?:^1[3456789]|^9[28])\d{9}$/.test(e)},n=function(e){return/^\b[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$/i.test(e)};t["a"]={isMobile:o,isEmail:n}},af2e:function(e,t,a){"use strict";a("a310")},b635:function(e,t,a){"use strict";a.d(t,"a",(function(){return ee})),a.d(t,"b",(function(){return se}));var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:e.className},[a("div",{ref:"canvas-dag",staticClass:"butterfly-vue-container"})])},n=[],i=(a("fbef"),a("995b"));const s={disLinkable:!0,linkable:!0,draggable:!0,zoomable:!0,moveable:!0,theme:{edge:{arrow:!0,shapeType:"Straight"}}};var l=a("9523"),r=a.n(l);a("ddb0"),a("f8c9");const c=(e,t)=>({left:e+"px",top:t+"px",position:"absolute"});class d extends i["Node"]{constructor(...e){super(...e),r()(this,"draw",(e=>{const t=document.createElement("div"),a=c(e.left,e.top);return Reflect.ownKeys(a).forEach((e=>{t.style[e]=a[e]})),t.className="butterfly-node",t.id="bf_node_"+e.id,t}))}}var u=d;const p=(e,t)=>({left:e+"px",top:t+"px",position:"absolute"});class m extends i["TreeNode"]{constructor(e){super(e),r()(this,"draw",(e=>{const t=document.createElement("div"),a=p(e.left,e.top);return Reflect.ownKeys(a).forEach((e=>{t.style[e]=a[e]})),t.className="butterfly-node",t.id="bf_node_"+e.id,t})),this.children=e.children,this.parent=e.parent,this.collapsed=e.collapsed||!1,e.isRoot&&(this.isRoot=e.isRoot)}}var f=m;class g extends i["Edge"]{drawArrow(e){let t=super.drawArrow(e);return t}drawLabel(){const e=document.createElement("div");return this.id||(this.id=String(Number(new Date))),e.id=`edge_label_${this.id}`,e.className="butterflies-label",e}}var b=g;const h=(e,t)=>({left:e+"px",top:t+"px",position:"absolute"});class v extends i["Group"]{draw(e){const t=document.createElement("div"),a=h(e.left,e.top);return Object.keys(a).forEach((e=>{t.style[e]=a[e]})),t.className="butterfly-group",t.id=`bf_group_${e.id}`,t.className="butterflies-group",t}}var y=v;a("caad");const w=e=>Array.isArray(e)?e:[e],C=(e=[],t=[],a="id")=>{e=w(e),t=w(t);const o=[],n=[],i=[];for(let s of e)t.map((e=>e[a])).includes(s[a])?i.push(s):o.push(s);for(let s of t)e.map((e=>e[a])).includes(s[a])||n.push(s);return{created:o,deleted:n,updated:i}};var $=C,D=a("2ef0"),k=a.n(D),x=(e,t=null)=>{if(e){if(!e.relayout){const{type:t,options:a}=e.layout||{};e.relayout=function(o){o?(e._autoLayout({...e,nodes:o}),I(e,o)):e.constructor===i["TreeCanvas"]?e._autoLayout(e):t&&a&&e.autoLayout(t,a||{}),this.nodes.forEach((e=>{e.moveTo(e.left,e.top)})),e.recalc&&e.recalc()}}e.relayout(t)}};const I=(e,t)=>{let a={};t.forEach((e=>{a[e.id]=e})),e.nodes.forEach((e=>{k.a.get(a,`[${e.id}].left`)&&(e.left=a[e.id].left),k.a.get(a,`[${e.id}].top`)&&(e.top=a[e.id].top)}))};a("d9e2");var j=a("2b0e"),S=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vue-bf-group"},[a("div",{staticClass:"vue-bf-group-header"},[e._v("\n    group"+e._s(e.itemData.id)+"\n  ")]),a("div",{staticClass:"vue-bf-group-content"})])},A=[],N={name:"vue-group",props:{itemData:{type:Object,required:!0}}},O=N,M=(a("ee41"),a("2877")),P=Object(M["a"])(O,S,A,!1,null,"59749241",null),E=P.exports,L=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vue-bf-node"},[e._v("\n  node"+e._s(e.itemData.id)+"\n")])},T=[],U={name:"vue-node",props:{itemData:{type:Object,required:!0}}},R=U,q=(a("8f19"),Object(M["a"])(R,L,T,!1,null,"5e02d29e",null)),B=q.exports;const F=(e,t,a=null,o=null)=>{let n;if(e.render)switch(typeof e.render){case"string":n=j["default"].extend({template:e.render,props:{itemData:{type:Object,required:!0}}});break;case"object":n=j["default"].extend(e.render);break;default:throw Error(`${t}存在render属性，应该为string或者object类型，现在是${typeof F}`)}else switch(t){case"group":n=j["default"].extend(E);break;case"node":n=j["default"].extend(B);break;default:break}let i={itemData:e};if("node"===t){let s=o.findIndex((t=>t.id===e.id));if(-1===s)return console.warn("canvas.addNodes方法出错"),null;let l=o[s];i.canvasNode=l;const r=new n({parent:a,propsData:i});return r.$butterfly={type:t},r._events=a._events,r.$mount(),r}{const e=new n({propsData:i});return e._events=a._events,e.$mount(),e}},z=(e,t,a)=>{t.map(((t,o)=>{const n=t.id;if(!n)return void console.warn(`groups的${o}不含ID属性，请检查格式`);const i=e.querySelector(`*[id^='bf_group_${t.id}']`);if(!i)return;let s=F(t,"group",a);i.append(s.$el)}))},Q=(e,t,a,o)=>{a.map(((a,n)=>{if(k.a.isArray(a))return;const i=a.id;if(!i)return void console.warn(`nodes的${n}不含ID属性，请检查格式`);const s=e.querySelector(`*[id^='bf_node_${a.id}']`);if(!s)return;let l=F(a,"node",o,t);s.append(l.$el);let r=t.findIndex((e=>e.id===a.id));return-1===r?(console.warn("canvas.addNodes方法出错"),null):void 0}))},W=(e,t,a)=>{t.map(((t,o)=>{const n=t.id;if(n){if(t.render){const o=e.querySelector(`*[id^='edge_label_${t.id}']`);if(!o)return;let n=F(t,"edge",a);o.append(n.$el)}}else console.warn(`edges的${o}不含ID属性，请检查格式`)}))},V=({nodes:e=[],edges:t=[],groups:a=[],canvas:o={}})=>{let n=u;return o.constructor===i["TreeCanvas"]&&(n=f),{nodes:e.map((e=>({...e,Class:n}))),edges:t.map((e=>({type:"endpoint",...e,Class:b}))),groups:a.map((e=>({...e,Class:y})))}},J=(e,t,a,o)=>{e.constructor===i["TreeCanvas"]&&(e.layout&&e.previousIsFlatNode&&(t=e._handleTreeNodes(t||[],_.get({},"isFlatNode",!1))),x(e,t));const{created:n,deleted:s}=$(t,a);e.removeNodes(s.map((e=>e.id)),!0),e.addNodes(V({nodes:n}).nodes),Q(e.root,e.getDataMap().nodes,{nodes:n}.nodes,o)},Y=(e,t,a,o)=>{const{created:n,deleted:i}=$(t,a);e.removeEdges(i.map((e=>e.id)),!0),e.addEdges(V({edges:n}).edges,!0),W(e.root,{edges:n}.edges,o)},G=(e,t,a,o)=>{const{created:n,deleted:i}=$(t,a);V({groups:i}).groups.forEach((t=>{e.removeGroup(t.id)})),V({groups:n}).groups.forEach((t=>{e.addGroup(t)})),z(e.root,{groups:n}.groups,o)};var Z=e=>{e&&(e.recalc=function(){this.nodes.forEach((e=>{e.endpoints.forEach((e=>{k.a.isFunction(e.updatePos)&&e.updatePos()}))})),this.edges.forEach((e=>{k.a.isFunction(e.redraw)&&e.redraw()})),this.groups.forEach((e=>{k.a.isFunction(e.redraw)&&e.redraw()}))},e.recalc())},K={name:"butterfly-vue",props:{className:{type:String,default:"butterfly-vue"},baseCanvas:{type:Function,default:i["Canvas"]},canvasConf:{type:Object,default:()=>s},canvasData:{type:Object,required:!0}},data(){return{canvas:null,nodes:this.canvasData.nodes,groups:this.canvasData.groups,edges:this.canvasData.edges}},methods:{initCanvas(){const e=this.$refs["canvas-dag"];e?(this.canvasConf.root=e,this.canvas=new this.baseCanvas(this.canvasConf)):console.warn("当前canvas没有绑定dom节点，无法渲染")},updateCavans(){if(!this.canvas)return void console.warn("当前canvas为null，初始化存在问题");const e=this.canvas.nodes,t=this.canvas.edges,a=this.canvas.groups;G(this.canvas,this.groups,a,this),J(this.canvas,this.nodes,e,this),Y(this.canvas,this.edges,t,this)},re(){this.canvas?(Z(this.canvas),x(this.canvas)):console.warn("当前canvas为null，初始化存在问题")},redraw(){const e=this.canvas.nodes,t=this.canvas.edges,a=this.canvas.groups;Y(this.canvas,[],t,this),J(this.canvas,[],e,this),G(this.canvas,[],a,this),G(this.canvas,this.groups,a,this),J(this.canvas,this.nodes,e,this),Y(this.canvas,this.edges,t,this),this.re()},onCreateEdge(e){let t=e.links[0];if(t){let e={id:`${t.sourceNode.id}.${t.sourceEndpoint.id}-${t.targetNode.id}.${t.targetEndpoint.id}`,sourceEndpointId:t.sourceEndpoint.id,sourceNodeId:t.sourceNode.id,targetEndpointId:t.targetEndpoint.id,targetNodeId:t.targetNode.id};this.edges.push({id:`${e.sourceNodeId}.${e.sourceEndpointId}-${e.targetNodeId}.${e.targetEndpointId}`,sourceNode:e.sourceNodeId,targetNode:e.targetNodeId,source:e.sourceEndpointId,target:e.targetEndpointId}),this.$emit("onCreateEdge",e)}},onDeleteEdge(e){let t=e.links[0];if(t){let e={id:t.id,sourceEndpointId:t.sourceEndpoint.id,sourceNodeId:t.sourceNode.id,targetEndpointId:t.targetEndpoint.id,targetNodeId:t.targetNode.id},a=this.edges.findIndex((e=>e.id===t.id));this.edges.splice(a,1),this.$emit("onDeleteEdge",e)}},onChangeEdges(e){let t=e.addLinks[0],a=e.delLinks[0];if(t&&a){let o={addLink:{id:`${t.sourceNode.id}.${t.sourceEndpoint.id}-${t.targetNode.id}.${t.targetEndpoint.id}`,sourceEndpointId:t.sourceEndpoint.id,sourceNodeId:t.sourceNode.id,targetEndpointId:t.targetEndpoint.id,targetNodeId:t.targetNode.id},delLinks:{id:`${a.sourceNode.id}.${a.sourceEndpoint.id}-${a.targetNode.id}.${a.targetEndpoint.id}`,sourceEndpointId:a.sourceEndpoint.id,sourceNodeId:a.sourceNode.id,targetEndpointId:a.targetEndpoint.id,targetNodeId:a.targetNode.id},info:e.info},n=this.edges.findIndex((e=>e.id===o.delLinks.id));this.edges.splice(n,1),this.edges.push({id:`${t.sourceNode.id}.${t.sourceEndpoint.id}-${t.targetNode.id}.${t.targetEndpoint.id}`,sourceNode:o.addLink.sourceNodeId,targetNode:o.addLink.targetNodeId,source:o.addLink.sourceEndpointId,target:o.addLink.targetEndpointId}),this.$emit("onChangeEdges",o)}},onOtherEvent(e){this.$emit("onOtherEvent",e)}},watch:{groups:{handler(){this.updateCavans(),this.re()}},nodes:{handler(){this.updateCavans(),this.re()}},edges:{handler(){this.updateCavans(),this.re()}},canvasData:{handler(){this.nodes=this.canvasData.nodes,this.groups=this.canvasData.groups,this.edges=this.canvasData.edges}}},mounted(){this.initCanvas(),this.canvas?(this.updateCavans(),this.re(),this.$emit("onLoaded",this),this.canvas.on("events",(e=>{if("link:connect"===e.type)this.onCreateEdge(e);else if("links:delete"===e.type&&e.links.length>0)this.onDeleteEdge(e);else if("link:reconnect"===e.type)this.onChangeEdges(e);else{if("drag:end"===e.type){let{dragGroup:t,dragNode:a}=e;if(null!==t){let e=this.groups.findIndex((e=>e.id===t.id));-1!==e&&(this.groups[e].left=t.left,this.groups[e].top=t.top),this.canvasData.groups=this.groups}if(null!==a&&Array.isArray(this.nodes)){let e=this.nodes.findIndex((e=>e.id===a.id));-1!==e&&(this.nodes[e].left=a.left,this.nodes[e].top=a.top),this.canvasData.nodes=this.nodes}}this.onOtherEvent(e)}}))):console.warn("当前canvas为null，初始化存在问题")}},H=K,X=(a("736d"),Object(M["a"])(H,o,n,!1,null,null,null)),ee=X.exports,te=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",e._g({class:e.className,attrs:{id:"bf_endpoint_"+e.id}},e.$listeners),[e._t("default",(function(){return[a("div",[e._v("\n      "+e._s(e.id)+"\n    ")])]}))],2)},ae=[],oe={name:"butterfly-vue-endpoint",props:{id:{type:String,required:!0},className:{type:String,default:"vue-bf-endpoint-default"},param:{type:Object}},methods:{findParent(e){if(e.$parent){let t=k.a.get(e,"$parent.$butterfly.type",!1);if(!t)return this.findParent(e.$parent);if(["node"].includes(t)&&k.a.get(e,"$parent.$options.propsData.canvasNode",!1))return e.$parent}else console.warn("锚点没有被node包裹上,请检查！")}},mounted(){let e=this.findParent(this),t=k.a.get(e,"$options.propsData.canvasNode",!1);t&&!t.getEndpoint("bf_endpoint_"+this.id)&&t.addEndpoint({id:"bf_endpoint_"+this.id,dom:this.$el,...this.param})},beforeDestroy(){let e=this.findParent(this);e.canvasNode.getEndpoint("bf_endpoint_"+this.id)&&e.canvasNode.removeEndpoint("bf_endpoint_"+this.id)}},ne=oe,ie=(a("3cf9"),Object(M["a"])(ne,te,ae,!1,null,null,null)),se=ie.exports},b6bc:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAATtJREFUWEfFl8FKAlEUhj9fR5e6sZ0vUT6cq5ZCEBQEBUFSJmgEbRSCgqCgRRAkhAgiF45wGI86c+fOvbMfvu/+Z+afMzUSX7XEfMoI1IEesAA6vgfxFXDwPtAAHoGjmAIa/gJ0gWksAQ1/Bk6AV1+4u6/ICDR8IvC3MvAiAho+EvhHWXheAQ1/EPhnCHgeAQ0fAMfAdyj4IQENvxX4T0j4PgENvxH4b2j4LgENvxL4vAq4JaDhlwL/rwqeFdDwc4Evq4RnBVy5NIEzga+qhmcFhkA7pUDyEbhEtMSFtF60h3Az8qSvoSVxLUlEKyJLInoVWxJ3kkS0j5ElcS8SX6E6Iu9GlHQhsZIYSxLvZZPIm4AlEX0ptSTcWu4245lvEkUTsCSegFZsgU1tnwJ/KX7NfA+8dZ/vCIIJrAF4vFAhw9JJUQAAAABJRU5ErkJggg=="},b91b:function(e,t,a){},bd99:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"drag-node"},[a("div",{staticClass:"drag-header"},[e._v("\n    "+e._s(e.itemData.userData.title)+"\n  ")]),a("div",{staticClass:"cursor-pointer drag-content",on:{click:e.showInfo}},[a("div",{staticClass:"info"},[e._v("\n      "+e._s(e.itemData.userData.prompt)+"\n\n    ")]),a("div",{staticClass:"drag-history"})])])},n=[],i=a("1f2a"),s={name:"drag-node",props:{itemData:{type:Object},canvasNode:{type:Object}},methods:{showInfo(){i["a"].$emit("clickNode",this.itemData)}},created(){}},l=s,r=(a("531c"),a("2877")),c=Object(r["a"])(l,o,n,!1,null,"2ff5ae4b",null);t["default"]=c.exports},bec5:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:""},on:{click:e.labelClick}})],1)},n=[],i={name:"base-label",props:{itemData:{type:Object}},methods:{labelClick(e){console.log("labelClick"),this.$emit("dblclick","emitlabelClick")}},created(){}},s=i,l=a("2877"),r=Object(l["a"])(s,o,n,!1,null,null,null);t["default"]=r.exports},c87c:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"butterfly-layout",attrs:{id:"canvas"}})},n=[],i=a("995b"),s=a.n(i),l=a("e50d"),r=a("6ece"),c=a("4487"),d=a.n(c);function u(e){return d.a.generate({length:e,charset:"alphabetic",capitalization:"lowercase"})}class p{constructor(e,t,a){this.id=u(5),this.label=e+this.id,this.Class=l["a"],this.className=a,this.endpoints=Object(r["a"])()}setPosition(e,t){this.top=e,this.left=t}setIcon(e,t){this.iconClass=e,this.iconType=t}}var m={"canvas:click":function(e){console.log(e)},"group:click":function(e){console.log("group:click",e),e.group.toggleClass&&e.group.toggleClass("active")},"node:click":function(e){console.log("node:click",e);let t=e.node;t.toggleClass&&t.toggleClass("focus"),t.toggleFocus&&t.toggleFocus()},"node:click:tools":function(e){console.log(e);let{node:t,name:a}=e,o=new p("打包","group","simple-yellow");if(o.setIcon("orange","icon-guanlian"),"next"===a){let e=this.instance.getNeighborNodesAndEdgesByLevel({node:t,type:"out",level:1});console.log(e);let a=e.nodes.length?48*(e.nodes.length-1)+t.top:t.top;o.setPosition(a,t.left+t.dom.clientWidth+40),this.instance.addNode(o),this.instance.addEdge({source:"right",target:"left",sourceNode:t.id,targetNode:o.id,arrow:!0,type:"endpoint",arrowPosition:.5})}else if("hori"===a){console.log("添加并行");let e=this.instance.getNeighborNodesAndEdgesByLevel({node:t,level:2});console.log(e)}else"close"===a&&this.instance.removeNode(t.id)}};const{Canvas:f}=s.a;var g=function(e){let t=document.getElementById("canvas"),a=new f({root:t,disLinkable:!0,linkable:!0,draggable:!0,zoomable:!0,moveable:!0,layout:{type:"dagreLayout",options:{nodeSize:[108,32],rankdir:"LR",align:"DL",nodesep:8,ranksep:16,controlPoints:!1}}});return a.draw(e),a.on("events",(e=>{let{type:t}=e,a=m[t];a&&a.bind(this)(e)})),a},b={name:"pipeline",props:{data:{type:Object}},data(){return{currentData:this.data,instance:{}}},methods:{init:g,redraw(){console.log(this.instance),this.instance.autoLayout(this.instance.layout.type,this.instance.layout.options)}},mounted(){this.instance=this.init(this.currentData)}},h=b,v=a("2877"),y=Object(v["a"])(h,o,n,!1,null,null,null);t["default"]=y.exports},d03f:function(e,t,a){"use strict";a("86b2")},d819:function(e,t,a){"use strict";a("0311")},e2bb:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"grid-node"},[e._v("\n  "+e._s(e.itemData.label)+"\n")])},n=[],i={name:"grid-node",props:{itemData:{type:Object},canvasNode:{type:Object}},methods:{},created(){}},s=i,l=(a("0e73"),a("2877")),r=Object(l["a"])(s,o,n,!1,null,"5785b20a",null);t["default"]=r.exports},e50d:function(e,t,a){"use strict";var o=a("9523"),n=a.n(o),i=a("995b"),s=a.n(i),l=a("1157"),r=a.n(l);class c extends s.a.Node{constructor(e){super(e),n()(this,"draw",(e=>{let t=["pipeline-base-node"];this.options.bgColor&&t.push(`path-bg-${this.options.bgColor}`),this.options.className&&t.push(`path-bg-${this.options.className}`);let a=r()(`<div class="${t.join(" ")}"></div>`).attr("id",e.id).css("top",e.top+"px").css("left",e.left+"px");return this._createTypeIcon(a),this._createText(a),this._createIcon(a[0]),a[0]})),n()(this,"focus",(()=>{r()(this.dom).find(".logo-toolbar").addClass("show")})),n()(this,"unFocus",(()=>{r()(this.dom).find(".logo-toolbar").removeClass("show")})),this.options=e}_createIcon(e=this.dom){let t=r()('<div class="logo-toolbar"></div>');const a=r()('<div class="box-container"></div>');a.append(r()('<div class="box"  name="close"><i class="iconfont icon-guanbi"></i></div>')),a.append(r()('<div class="box" name="next"><i class="iconfont icon-webicon310"></i></div>'));let o=this;a.on("click",".box",(function(e){e.stopPropagation(),o.clickTools(r()(this).attr("name")),o.toggleFocus()})),t.append(a),r()(e).append(t)}_createTypeIcon(e=this.dom){const t=r()(`<span class="icon-box ${this.options.iconClass}"></span>`)[0],a=r()(`<i class="iconfont ${this.options.iconType}"></i>`)[0];t.append(a),r()(e).append(t)}_createText(e=this.dom){r()('<span class="text-box"></span>').text(this.options.label).appendTo(e)}toggleClass(e){r()(this.dom).toggleClass(e)}toggleFocus(){r()(this.dom).find(".logo-toolbar").toggleClass("show")}clickTools(e){this.emit("events",{type:"node:click:tools",node:this,name:e})}}t["a"]=c},e7a7:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"drag-node"},[a("div",{staticClass:"drag-header"},[e._v("\n    开始\n  ")])])}],i={name:"drag-node",props:{itemData:{type:Object},canvasNode:{type:Object}},methods:{},created(){}},s=i,l=(a("2109"),a("2877")),r=Object(l["a"])(s,o,n,!1,null,"61babde6",null);t["default"]=r.exports},ea33:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",[a("el-aside",{staticClass:"ml-5",attrs:{width:"200px"}},[a("div",{ref:"user1",staticClass:"node-container mt-10 mb-8",attrs:{draggable:""},on:{dragstart:function(t){e.dragstart(t,e.user1)}}},[a("dragNode",{attrs:{itemData:e.user1}})],1),a("div",{ref:"user2",staticClass:"node-container mb-10",attrs:{draggable:""},on:{dragstart:function(t){e.dragstart(t,e.user2)}}},[a("dragNode",{attrs:{itemData:e.user2}})],1),a("div",{ref:"user3",staticClass:"node-container mb-10",attrs:{draggable:""},on:{dragstart:function(t){e.dragstart(t,e.user3)}}},[a("dragNode",{attrs:{itemData:e.user3}})],1)]),a("q-separator",{staticClass:"ml-5",staticStyle:{height:"1000px"},attrs:{vertical:""}}),a("el-main",{staticStyle:{"background-color":"#F2F6FC"}},[a("div",{on:{dragover:e.dragover,drop:e.addNode}},[a("butterfly-vue",{key:"drag",attrs:{className:"drag",canvasData:e.mockData},on:{onLoaded:e.finishLoaded}})],1)]),a("el-drawer",{staticClass:"h-full",attrs:{modal:!1,visible:e.drawer},on:{"update:visible":function(t){e.drawer=t}}},[a("div",{staticClass:"pl-5 "},[a("el-form",{attrs:{"label-width":"80px"}},[a("el-form-item",{attrs:{label:e.$t("flow.title")}},[a("el-input",{model:{value:e.nodeData.title,callback:function(t){e.$set(e.nodeData,"title",t)},expression:"nodeData.title"}})],1),a("el-form-item",{attrs:{label:e.$t("flow.prompt")}},[a("el-input",{attrs:{type:"textarea",rows:"5"},model:{value:e.nodeData.prompt,callback:function(t){e.$set(e.nodeData,"prompt",t)},expression:"nodeData.prompt"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.handleSave}},[e._v(e._s(e.$t("flow.Save")))]),a("el-button",{on:{click:e.handleDel}},[e._v(e._s(e.$t("flow.Delete")))])],1)],1)],1)])],1)},n=[],i=a("bd99"),s=a("e7a7"),l=a("b635"),r=a("1f2a"),c={name:"Drag",components:{ButterflyVue:l["a"],dragNode:i["default"],startNode:s["default"]},data(){return{drawer:!1,nodeData:{id:"0",title:"节点1",prompt:"",modify:1,reader:5},user1:{ref:"user1",userData:{title:"节点1",prompt:"你是一个保险专员，当前用户正在与你面对面交流，需要生成一段开场白，体现你的专业性，目前开放了信息修改业务。字数不超过50字",modify:1,reader:5}},user2:{ref:"user2",userData:{title:"节点2",prompt:"收集用户回复内容并赋值到",modify:1,reader:5}},user3:{ref:"user3",userData:{title:"节点3",prompt:"设置prompt 或者提问",modify:1,reader:5}},mockData:{nodes:[{id:"1",left:50,top:300,render:s["default"],endpoints:[{id:"left",orientation:[-1,0],pos:[0,.5]},{id:"right",orientation:[1,0],pos:[0,.5]}],userData:{title:"申请人",prompt:"",modify:12,reader:5}}],groups:[],edges:[]},canvansRef:{},butterflyVue:{}}},setup(e,{root:t}){},created(){r["a"].$on("clickNode",(e=>{this.drawer=!0,this.nodeData.id=e.id,this.nodeData.title=e.userData.title,this.nodeData.prompt=e.userData.prompt,this.nodeData.reader=e.userData.reader}))},methods:{clickNode(e){},handleSave(){let e=this.mockData.nodes.find((e=>e.id===this.nodeData.id));e.userData.modify=this.nodeData.modify,e.userData.reader=this.nodeData.reader,e.userData.prompt=this.nodeData.prompt,e.userData.title=this.nodeData.title,this.drawer=!1},handleDel(){let e=this.mockData.nodes.findIndex((e=>e.id===this.nodeData.id));-1!==e&&this.mockData.nodes.splice(e,1),this.mockData.edges.forEach((e=>{e.sourceNode==this.nodeData.id||(e.targetNode,this.nodeData.id)})),this.drawer=!1},guid(){function e(){return(65536*(1+Math.random())|0).toString(16).substring(1)}return e()+e()+"-"+e()},dragstart(e,t){e.dataTransfer.setData("user",JSON.stringify(t)),e.dataTransfer.setDragImage(this.$refs[t.ref],0,0)},dragover(e){e.preventDefault()},addNode(e){const t={id:"left",orientation:[-1,0],pos:[0,.5]},a={id:"right",orientation:[1,0],pos:[0,.5]};let{clientX:o,clientY:n}=e,s=this.canvansRef.terminal2canvas([o,n]),l=JSON.parse(e.dataTransfer.getData("user"));this.mockData.nodes.push({id:this.guid(),left:s[0],top:s[1],render:i["default"],userData:l.userData,endpoints:[t,a]})},finishLoaded(e){this.butterflyVue=e,this.canvansRef=e.canvas,window.butterflyVue=e,this.canvansRef.setMinimap(!0,{height:100,nodeColor:"rgb(234,217,162)",activeNodeColor:"rgb(234,162,176)"}),console.log("finish")}}},d=c,u=(a("af2e"),a("2877")),p=a("eb85"),m=a("eebe"),f=a.n(m),g=Object(u["a"])(d,o,n,!1,null,null,null);t["default"]=g.exports;f()(g,"components",{QSeparator:p["a"]})},ee41:function(e,t,a){"use strict";a("f8ce")},ef50:function(e,t,a){"use strict";a.d(t,"d",(function(){return n})),a.d(t,"f",(function(){return i})),a.d(t,"g",(function(){return s})),a.d(t,"e",(function(){return l})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return c})),a.d(t,"i",(function(){return d})),a.d(t,"h",(function(){return u})),a.d(t,"b",(function(){return p}));var o=a("5184");const n=o["a"]`
query getUsers{
  getUsers{
    id
    name
    email
    realName
    phone
    desc
    role
    avatarUrl
    createdAt
    updatedAt
    wxUserId
  }
}
`,i=o["a"]`
query getWxUsers($take: Int,$skip: Int){
  getWxUsers(take: $take , skip: $skip){
    id
    name
    avatarUrl
    openId
    lastOperateDate
    lastPayDate
    createdAt
    updatedAt
  }
}
`,s=o["a"]`
query getWxUsersAndCount($take: Int,$skip: Int,$name: String){
  getWxUsersAndCount(take: $take , skip: $skip , name: $name){
    totalCount
        data{
    id
    name
    avatarUrl
    openId
    lastOperateDate
    distributorId
    lastPayDate
    createdAt
    updatedAt
        }
  }
}
`,l=o["a"]`
query getWxUserScanDistributorRecordsAndCount($take: Int,$skip: Int){
  getWxUserScanDistributorRecordsAndCount(take: $take , skip: $skip ){
    totalCount
        data{
        wxUser{
    id
    name
    avatarUrl
    openId
    lastOperateDate
    distributorId
    lastPayDate
    createdAt
    updatedAt
    }
        }
  }
}
`,r=o["a"]`
query getUserLawyers($take: Int,$skip: Int){
  getUserLawyers(take: $take , skip: $skip ){
 
    id
    name
        
  }
}
`,c=o["a"]`
  mutation createUser($user: UserCreateInput!) {
    createUser(user: $user){
      id
      name
      email
      phone
      role
      avatarUrl
      createdAt
      updatedAt
    }
  }
`,d=o["a"]`
  mutation updateUserInfoByAdmin($user: AdminUserUpdateInput!,$userId: String!) {
    updateUserInfoByAdmin(user: $user,userId: $userId){
      id
      name
      email
      phone
      role
      avatarUrl
      createdAt
      updatedAt
      wxUserId
    }
  }
`,u=o["a"]`
  mutation updateCommodityLawyers($lawyerIds: [String!]!,$id: Int!) {
    updateCommodityLawyers(lawyerIds: $lawyerIds,id: $id){
      id
      name
    }
  }
`,p=(o["a"]`
  mutation updateUserInfo($user: UserUpdateInput!) {
    updateUserInfo(user: $user){
      id
      name
      email
      phone
      role
      avatarUrl
      createdAt
      updatedAt
    }
  }
`,o["a"]`
  mutation deleteUser($userId: String!) {
    deleteUser(userId: $userId)
  }
`)},f526:function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));var o=a("fbf9"),n=a.n(o),i=a("547c"),s=a.n(i),l=a("0083"),r=a.n(l),c=a("21a6");const d=(e,t,a)=>{r.a.getBinaryContent(e,((e,o)=>{if(e)throw e;const i=new s.a(o),l=(new n.a).loadZip(i);console.log(l),l.setData(t);try{l.render()}catch(e){const t={message:e.message,name:e.name,stack:e.stack,properties:e.properties};throw console.log({error:t}),e}const r=l.getZip().generate({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"});Object(c["saveAs"])(r,a)}))}},f53e:function(e,t,a){"use strict";a.d(t,"c",(function(){return n})),a.d(t,"b",(function(){return i})),a.d(t,"d",(function(){return s})),a.d(t,"a",(function(){return l}));var o=a("5184");const n=o["a"]`
mutation register($user: RegisterInput!) {
    register(user: $user) {
        name
        email
        password
        projectId
        userType
    }
  }
`,i=o["a"]`
mutation login($user: UserLoginInput!) {
  login(user: $user)
  }
`,s=(o["a"]`
mutation thirdLogin($token: String!) {
  thirdLogin(token: $token)
}
`,o["a"]`
mutation sendEmailVerification($email: String!) {
  sendEmailVerification(email: $email)
}
`),l=o["a"]`
mutation confirmCode($code: String!, $email: String!) {
  confirmCode(code: $code, email: $email)
}
`;o["a"]`
mutation logoutTrack {
    logoutTrack
  }
`},f896:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"g",(function(){return i})),a.d(t,"e",(function(){return s})),a.d(t,"a",(function(){return l})),a.d(t,"f",(function(){return r})),a.d(t,"c",(function(){return c})),a.d(t,"d",(function(){return d})),a.d(t,"h",(function(){return u}));var o=a("5184");const n=o["a"]`
mutation createCommodity ($commodity: CommodityInput!,$lawyerIds: [String!]!)  {
    createCommodity(commodity: $commodity,lawyerIds: $lawyerIds) {
        name

}
  }
`,i=o["a"]`
mutation updateCommodity ($id: Int!,$commodity: CommodityInput!,$lawyerIds: [String!]!)  {
    updateCommodity(id: $id,commodity: $commodity,lawyerIds: $lawyerIds){
        name
    }
  }
`,s=o["a"]`
mutation setOfflineCommodity ($id: Int!)  {
    setOfflineCommodity(id: $id)
  }
`,l=o["a"]`
mutation copyCommodity ($id: Int!,$legalDocumentProjectId: Int!
$name: String!)  {
    copyCommodity(id: $id,legalDocumentProjectId: $legalDocumentProjectId,name: $name){
    id
    }
  }
`,r=o["a"]`
mutation setReleaseCommodity ($id: Int!)  {
    setReleaseCommodity(id: $id)
  }
`,c=o["a"]`
  mutation deleteCommodity($id: Int!) {
    deleteCommodity(id: $id)
  }
  `,d=o["a"]`
query getCommoditys  {
    getCommoditys {
        id
        name
        uuid
        qrCode
        validDays
        h5Link
        legalDocumentProjectId
        price
        availableQueries
        legalDocumentProject{
            id
            name
        }
        lawyers{
        id
        name
        }
        createdAt
        updatedAt
        mainImg
        description
        marketPrice
        details
        carouselImgs
        detailImgs
        status
        creatorId
        stock
        state
  }
}
`,u=o["a"]`
mutation updateCommodityByDistributor ($id: Int!,$commodity: CommodityDistributorInput!,$lawyerIds: [String!]!)  {
    updateCommodityByDistributor(id: $id,commodity: $commodity,lawyerIds: $lawyerIds){
        name
    }
  }
`},f8ce:function(e,t,a){},fadb:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return i}));var o=a("0967");window.addEventListener("resize",(function(){const e={width:window.innerWidth,height:window.innerHeight};e.width<600?window.__isMobile=!0:window.__isMobile=!1}));const n=()=>!!window.__isMobile||!o["b"].is.desktop&&!!o["b"].is.mobile,i=(e,t)=>{window.addEventListener("resize",(function(){const a={width:window.innerWidth,height:window.innerHeight};let o=e[t];o=a.width<600,o!==e[t]&&(e[t]=o)}))}},fd80:function(e,t,a){}}]);