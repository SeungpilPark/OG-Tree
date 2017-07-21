<a name="DataController"></a>

## DataController
**Kind**: global class  
**Author:** <a href="mailto:sppark@uengine.org">Seungpil Park</a>  

* [DataController](#DataController)
    * [new DataController(tree)](#new_DataController_new)
    * _instance_
        * [.getWorkflowStructure](#DataController+getWorkflowStructure)
            * [new getWorkflowStructure(wf_id, inout)](#new_DataController+getWorkflowStructure_new)
        * [.viewController](#DataController+viewController) : <code>Doosan</code>
        * [.tree](#DataController+tree) : <code>Tree</code>
        * [.chartRenderer](#DataController+chartRenderer)
        * [.aras](#DataController+aras) : <code>aras</code>
        * [.thisItem](#DataController+thisItem) : <code>Object</code>
        * [.wfId](#DataController+wfId) : <code>String</code>
        * [.stdYN](#DataController+stdYN) : <code>String</code>
        * [.projectId](#DataController+projectId) : <code>String</code>
        * [.inn](#DataController+inn) : <code>null</code>
        * [.prjMaxDepth](#DataController+prjMaxDepth) : <code>number</code>
        * [.stdMaxDepth](#DataController+stdMaxDepth) : <code>number</code>
        * [.TYPE](#DataController+TYPE) : <code>Object</code>
        * [.iExmL2jsobj(node)](#DataController+iExmL2jsobj) ⇒ <code>Object</code>
        * [.getHtmlParameter(val)](#DataController+getHtmlParameter) ⇒ <code>String</code>
        * [.initResize()](#DataController+initResize)
        * [.init()](#DataController+init)
        * [.createBody(params)](#DataController+createBody) ⇒ <code>string</code>
        * [.applyMethod(methodName, body)](#DataController+applyMethod) ⇒ <code>Object</code>
        * [.getUserIdentity()](#DataController+getUserIdentity) ⇒ <code>String</code>
        * [.getUserId()](#DataController+getUserId) ⇒ <code>String</code>
        * [.getUserTeam()](#DataController+getUserTeam) ⇒ <code>string</code>
        * [.getWorkflowData(wf_id)](#DataController+getWorkflowData) ⇒ <code>Object</code>
        * [.getWorkflowHeader(wf_id)](#DataController+getWorkflowHeader) ⇒ <code>\*</code> &#124; <code>Object</code>
        * [.getItemById(type, id)](#DataController+getItemById) ⇒ <code>Object</code>
        * [.getActivityStructure(activity_id, folder_yn, folder_id, inout)](#DataController+getActivityStructure) ⇒ <code>Object</code>
        * [.getEdParentList(id, ed_yn)](#DataController+getEdParentList) ⇒ <code>Array</code>
        * [.getPickEd(ed_number, ed_name)](#DataController+getPickEd) ⇒ <code>Array</code>
        * [.nodeToJson(xmlNode)](#DataController+nodeToJson) ⇒ <code>Object</code>
        * [.getSchCombo(kind, discLine, discSpec, bg, REL_WF_ID, callback)](#DataController+getSchCombo)
        * [.getCurrentItemId(itemType, id)](#DataController+getCurrentItemId) ⇒ <code>Object</code>
        * [.getItemType(type)](#DataController+getItemType) ⇒ <code>String</code>
        * [.getRelType(sourceType, targetType, inout)](#DataController+getRelType) ⇒ <code>String</code>
        * [.showPropertyWindow(type, id, data, view)](#DataController+showPropertyWindow)
        * [.sortActivities(activityIds)](#DataController+sortActivities)
        * [.checkMaxCreateNumber(view, requestType)](#DataController+checkMaxCreateNumber) ⇒ <code>boolean</code>
        * [.createFolder(data, view)](#DataController+createFolder)
        * [.addFolderOutRelation(parentData, parentView, newItem, parentItem, parentType, parentId)](#DataController+addFolderOutRelation)
        * [.createEd(data, view, edType)](#DataController+createEd)
        * [.addFolderEDOutRelation(edItem, parentItem, data, view)](#DataController+addFolderEDOutRelation)
        * [.addPickEDOutRelation(edItems, parentItem, data, view)](#DataController+addPickEDOutRelation)
        * [.deleteOutItem(data, view)](#DataController+deleteOutItem)
        * [.createActivity()](#DataController+createActivity)
        * [.addInRel(source, target, selectedTargetList)](#DataController+addInRel)
        * [.deleteInRel(sourceId, sourceType, targetId, targetType)](#DataController+deleteInRel)
        * [.currentSortOrder()](#DataController+currentSortOrder) ⇒ <code>Object</code>
        * [.createWorkFlowData(resultNodeList, who, inout)](#DataController+createWorkFlowData) ⇒ <code>Array</code>
            * [~getStateColorAndStroke(type, state, isDelay)](#DataController+createWorkFlowData..getStateColorAndStroke) ⇒ <code>Object</code>
            * [~convertDate(dateStr)](#DataController+createWorkFlowData..convertDate) ⇒ <code>\*</code>
            * [~checkDelay(node)](#DataController+createWorkFlowData..checkDelay) ⇒ <code>boolean</code>
        * [.createMyWorkFlowData(resultNodeList, inout)](#DataController+createMyWorkFlowData) ⇒ <code>Array</code>
        * [.createOtherWorkFlowData(resultNodeList)](#DataController+createOtherWorkFlowData) ⇒ <code>Array</code>
        * [.refreshOtherWorkflow(wfId)](#DataController+refreshOtherWorkflow)
        * [.refreshAll()](#DataController+refreshAll)
        * [.refreshMyWorkFlow()](#DataController+refreshMyWorkFlow)
        * [.refreshOutFolder(data, view)](#DataController+refreshOutFolder)
        * [.syncExpandDataWithTree(data)](#DataController+syncExpandDataWithTree)
        * [.getEDBTypeList()](#DataController+getEDBTypeList) ⇒ <code>\*</code> &#124; <code>Object</code>
        * [.getRelOtherPropsForEditor()](#DataController+getRelOtherPropsForEditor) ⇒ <code>\*</code> &#124; <code>Array</code>
        * [.getProjectMember()](#DataController+getProjectMember)
        * [.updatePromote(checkedList)](#DataController+updatePromote)
        * [.updateOwner(checkedList, identityId)](#DataController+updateOwner)
        * [.updateName(data, view, name)](#DataController+updateName)
        * [.convertMethodResultToJsonArray(result)](#DataController+convertMethodResultToJsonArray) ⇒ <code>Array</code>
        * [.checkPM()](#DataController+checkPM) ⇒ <code>\*</code>
        * [.getProjectMapData()](#DataController+getProjectMapData)
        * [.getKeyActivityList()](#DataController+getKeyActivityList) ⇒ <code>\*</code> &#124; <code>Object</code>
        * [.getEngFuncCodeList()](#DataController+getEngFuncCodeList) ⇒ <code>\*</code> &#124; <code>Object</code>
        * [.getObjActivityList()](#DataController+getObjActivityList) ⇒ <code>\*</code> &#124; <code>Object</code>
        * [.saveMapData(mapDataJson)](#DataController+saveMapData) ⇒ <code>\*</code> &#124; <code>Object</code>
        * [.getChartData()](#DataController+getChartData) ⇒ <code>Object</code>
    * _inner_
        * [~stateJson](#DataController..stateJson)
        * [~chartStateJson](#DataController..chartStateJson)

<a name="new_DataController_new"></a>

--------------------------------------------------------------------------------
### new DataController(tree)
Aras data Handler


| Param | Description |
| --- | --- |
| tree | 오픈그래프 트리 라이브러리 |

<a name="DataController+getWorkflowStructure"></a>

--------------------------------------------------------------------------------
### dataController.getWorkflowStructure
**Kind**: instance class of <code>[DataController](#DataController)</code>  
<a name="new_DataController+getWorkflowStructure_new"></a>

--------------------------------------------------------------------------------
#### new getWorkflowStructure(wf_id, inout)
WF 하위의 액티비티, 폴더 및 ED 조회

**Returns**: <code>Object</code> - Aras Item  

| Param | Description |
| --- | --- |
| wf_id |  |
| inout | IN/OUT |

<a name="DataController+viewController"></a>

--------------------------------------------------------------------------------
### dataController.viewController : <code>Doosan</code>
Doosan view controller

**Kind**: instance property of <code>[DataController](#DataController)</code>  
<a name="DataController+tree"></a>

--------------------------------------------------------------------------------
### dataController.tree : <code>Tree</code>
Renderer 객체

**Kind**: instance property of <code>[DataController](#DataController)</code>  
<a name="DataController+chartRenderer"></a>

--------------------------------------------------------------------------------
### dataController.chartRenderer
차트 렌더러

**Kind**: instance property of <code>[DataController](#DataController)</code>  
<a name="DataController+aras"></a>

--------------------------------------------------------------------------------
### dataController.aras : <code>aras</code>
부모페이지의 aras 객체

**Kind**: instance property of <code>[DataController](#DataController)</code>  
<a name="DataController+thisItem"></a>

--------------------------------------------------------------------------------
### dataController.thisItem : <code>Object</code>
현재의 워크플로우 아이템

**Kind**: instance property of <code>[DataController](#DataController)</code>  
<a name="DataController+wfId"></a>

--------------------------------------------------------------------------------
### dataController.wfId : <code>String</code>
현재의 워크플로우 아이디

**Kind**: instance property of <code>[DataController](#DataController)</code>  
<a name="DataController+stdYN"></a>

--------------------------------------------------------------------------------
### dataController.stdYN : <code>String</code>
현재 워크플로우의 스탠다드 모드 여부

**Kind**: instance property of <code>[DataController](#DataController)</code>  
<a name="DataController+projectId"></a>

--------------------------------------------------------------------------------
### dataController.projectId : <code>String</code>
현재 워크플로우의 프로젝트 아이디

**Kind**: instance property of <code>[DataController](#DataController)</code>  
<a name="DataController+inn"></a>

--------------------------------------------------------------------------------
### dataController.inn : <code>null</code>
newIOMInnovator 리턴 객체

**Kind**: instance property of <code>[DataController](#DataController)</code>  
<a name="DataController+prjMaxDepth"></a>

--------------------------------------------------------------------------------
### dataController.prjMaxDepth : <code>number</code>
프로젝트, 폴더 5레벨 까지 enable, ed 는 6레벨까지 가능

**Kind**: instance property of <code>[DataController](#DataController)</code>  
<a name="DataController+stdMaxDepth"></a>

--------------------------------------------------------------------------------
### dataController.stdMaxDepth : <code>number</code>
스탠다드, 폴더 3레벨 까지 enable, 3레벨 일 경우는 ed 생성 불가

**Kind**: instance property of <code>[DataController](#DataController)</code>  
<a name="DataController+TYPE"></a>

--------------------------------------------------------------------------------
### dataController.TYPE : <code>Object</code>
아이템 타입 Contants

**Kind**: instance property of <code>[DataController](#DataController)</code>  
<a name="DataController+iExmL2jsobj"></a>

--------------------------------------------------------------------------------
### dataController.iExmL2jsobj(node) ⇒ <code>Object</code>
IE 에서 아라스 아이템을 json 으로 변환한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>Object</code> - json  

| Param | Description |
| --- | --- |
| node | Aras Item |

<a name="DataController+getHtmlParameter"></a>

--------------------------------------------------------------------------------
### dataController.getHtmlParameter(val) ⇒ <code>String</code>
URL 에서 지정된 파라미터의 get 프로퍼티를 가져온다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>String</code> - parameter value  

| Param | Description |
| --- | --- |
| val | url 파라미터 |

<a name="DataController+initResize"></a>

--------------------------------------------------------------------------------
### dataController.initResize()
부모 페이지로부터 워크플로우 아이템을 받아와서 적용하고, 부모페이지의 리사이즈 이벤트에 반응해 페이지를 레이아웃을 재구성한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
<a name="DataController+init"></a>

--------------------------------------------------------------------------------
### dataController.init()
아라스 객체를 얻기 위한 init 메소드. 최초 한번 실행한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
<a name="DataController+createBody"></a>

--------------------------------------------------------------------------------
### dataController.createBody(params) ⇒ <code>string</code>
key value 오브젝트로부터 xml 바디 스트링을 만든다

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>string</code> - body string  

| Param | Description |
| --- | --- |
| params | Object |

<a name="DataController+applyMethod"></a>

--------------------------------------------------------------------------------
### dataController.applyMethod(methodName, body) ⇒ <code>Object</code>
주어진 메소드 이름과 body 스트링으로 아라스의 applyMethod 를 호출한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>Object</code> - Aras Item  

| Param |
| --- |
| methodName | 
| body | 

<a name="DataController+getUserIdentity"></a>

--------------------------------------------------------------------------------
### dataController.getUserIdentity() ⇒ <code>String</code>
현재 접속중인 사용자의 IdentityId 를 반환한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>String</code> - identityId  
<a name="DataController+getUserId"></a>

--------------------------------------------------------------------------------
### dataController.getUserId() ⇒ <code>String</code>
현재 접속중인 사용자의 아이디를 반환한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>String</code> - userId  
<a name="DataController+getUserTeam"></a>

--------------------------------------------------------------------------------
### dataController.getUserTeam() ⇒ <code>string</code>
로그인한 유저의 팀을 알아온다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
<a name="DataController+getWorkflowData"></a>

--------------------------------------------------------------------------------
### dataController.getWorkflowData(wf_id) ⇒ <code>Object</code>
워크플로우 데이터를 반환한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>Object</code> - Aras Item  

| Param | Description |
| --- | --- |
| wf_id | 워크플로우 아이디 |

<a name="DataController+getWorkflowHeader"></a>

--------------------------------------------------------------------------------
### dataController.getWorkflowHeader(wf_id) ⇒ <code>\*</code> &#124; <code>Object</code>
워크플로우 헤더정보를 얻어온다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param |
| --- |
| wf_id | 

<a name="DataController+getItemById"></a>

--------------------------------------------------------------------------------
### dataController.getItemById(type, id) ⇒ <code>Object</code>
타입과 아이디와 매칭된 데이터를 반환한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>Object</code> - Aras Item  

| Param | Description |
| --- | --- |
| type | "workflow","activity","folder","ed" |
| id |  |

<a name="DataController+getActivityStructure"></a>

--------------------------------------------------------------------------------
### dataController.getActivityStructure(activity_id, folder_yn, folder_id, inout) ⇒ <code>Object</code>
하나의 폴더 또는 Activity 를 기준으로 하위 폴더와 ED 조회

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>Object</code> - Aras Item  

| Param | Description |
| --- | --- |
| activity_id |  |
| folder_yn | Y/N |
| folder_id |  |
| inout | IN / OUT |

<a name="DataController+getEdParentList"></a>

--------------------------------------------------------------------------------
### dataController.getEdParentList(id, ed_yn) ⇒ <code>Array</code>
선택한 폴더 또는 ED 를 input 으로 쓰는 워크플로우 - Activity 리스트 조회

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>Array</code> - json array  

| Param | Description |
| --- | --- |
| id |  |
| ed_yn | Y/N |

<a name="DataController+getPickEd"></a>

--------------------------------------------------------------------------------
### dataController.getPickEd(ed_number, ed_name) ⇒ <code>Array</code>
PICK ED 에 대한 조회 리스트(Project 에서만 필요)

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>Array</code> - json array  

| Param |
| --- |
| ed_number | 
| ed_name | 

<a name="DataController+nodeToJson"></a>

--------------------------------------------------------------------------------
### dataController.nodeToJson(xmlNode) ⇒ <code>Object</code>
Aras Item 노드를 Json 으로 변환한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>Object</code> - json  

| Param |
| --- |
| xmlNode | 

<a name="DataController+getSchCombo"></a>

--------------------------------------------------------------------------------
### dataController.getSchCombo(kind, discLine, discSpec, bg, REL_WF_ID, callback)
아더 워크플로우의 셀렉트 박스 리스트의 내용을 구한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param |
| --- |
| kind | 
| discLine | 
| discSpec | 
| bg | 
| REL_WF_ID | 
| callback | 

<a name="DataController+getCurrentItemId"></a>

--------------------------------------------------------------------------------
### dataController.getCurrentItemId(itemType, id) ⇒ <code>Object</code>
주어진 아이템의 아이디로 현재 아이템의 아이디를 리턴한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>Object</code> - Aras Item  

| Param |
| --- |
| itemType | 
| id | 

<a name="DataController+getItemType"></a>

--------------------------------------------------------------------------------
### dataController.getItemType(type) ⇒ <code>String</code>
주어진 타입으로 아라스 아이템 타입을 구한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>String</code> - itemType  

| Param | Description |
| --- | --- |
| type | "workflow","activity","folder","ed" |

<a name="DataController+getRelType"></a>

--------------------------------------------------------------------------------
### dataController.getRelType(sourceType, targetType, inout) ⇒ <code>String</code>
주어진 소스의 타입, 타켓의 타입 , 인아웃 으로 아라스 릴레이션 아이템 타입을 구한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>String</code> - itemType  

| Param | Description |
| --- | --- |
| sourceType | "workflow","activity","folder","ed" |
| targetType | "workflow","activity","folder","ed" |
| inout | "in","out" |

<a name="DataController+showPropertyWindow"></a>

--------------------------------------------------------------------------------
### dataController.showPropertyWindow(type, id, data, view)
주어진 타입과 아이디로 아라스의 아이템 상세정보창을 띄운다

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param | Description |
| --- | --- |
| type | "workflow","activity","folder","ed" |
| id |  |
| data | optional |
| view | optional |

<a name="DataController+sortActivities"></a>

--------------------------------------------------------------------------------
### dataController.sortActivities(activityIds)
주어진 액티비티 아이디 배열에 따라 아라스 액티비티 아이템을 소팅한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param | Description |
| --- | --- |
| activityIds | Array of Aras Activity id |

<a name="DataController+checkMaxCreateNumber"></a>

--------------------------------------------------------------------------------
### dataController.checkMaxCreateNumber(view, requestType) ⇒ <code>boolean</code>
주어진 아이템의 depth 로 추가 생성이 가능한지 여부를 반환한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param |
| --- |
| view | 
| requestType | 

<a name="DataController+createFolder"></a>

--------------------------------------------------------------------------------
### dataController.createFolder(data, view)
주어진 OG-Tree 폴더 하위에 신규 아라스 폴더를 생성하는 팝업창을 띄운다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param | Description |
| --- | --- |
| data | OG-Tree data |
| view | OG-Tree view |

<a name="DataController+addFolderOutRelation"></a>

--------------------------------------------------------------------------------
### dataController.addFolderOutRelation(parentData, parentView, newItem, parentItem, parentType, parentId)
주어진 부모 아이템과 자식 아이템(폴더) 사이에 릴레이션을 생성한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param | Description |
| --- | --- |
| parentData | OG-Tree parent data |
| parentView | OG-Tree parent view data |
| newItem | Aras created folder item |
| parentItem | Aras parent item |
| parentType | "workflow","activity","folder","ed" |
| parentId | Aras parent id |

<a name="DataController+createEd"></a>

--------------------------------------------------------------------------------
### dataController.createEd(data, view, edType)
주어진 OG-Tree 폴더 하위에 신규 아라스 ED를 생성하는 팝업창을 띄운다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param | Description |
| --- | --- |
| data | OG-Tree data |
| view | OG-Tree view data |
| edType | 'CAD','DHI_C3D_OUTPUT','Document','DHI_IntelliSheet','DHI_ED_KDM' |

<a name="DataController+addFolderEDOutRelation"></a>

--------------------------------------------------------------------------------
### dataController.addFolderEDOutRelation(edItem, parentItem, data, view)
주어진 부모 아이템(폴더)과 신규 생성한 자식 아이템(ED) 사이에 릴레이션을 생성한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param | Description |
| --- | --- |
| edItem | Aras created ED item |
| parentItem | Aras parent Folder item |
| data | OG-Tree parent data |
| view | OG-Tree parent view data |

<a name="DataController+addPickEDOutRelation"></a>

--------------------------------------------------------------------------------
### dataController.addPickEDOutRelation(edItems, parentItem, data, view)
주어진 부모 아이템(폴더)과 Pick 된 아이템(ED)들 사이에 DDCL 체크 후 릴레이션을 생성한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param | Description |
| --- | --- |
| edItems | Array of Picked ED Items |
| parentItem | Aras parent Folder item |
| data | OG-Tree parent data |
| view | OG-Tree parent view data |

<a name="DataController+deleteOutItem"></a>

--------------------------------------------------------------------------------
### dataController.deleteOutItem(data, view)
지정된 아웃데이터 아이템(액티비티, 폴더, ED) 과 그 부모간의 릴레이션을 삭제한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param | Description |
| --- | --- |
| data | OG-Tree data |
| view | OG-Tree view data |

<a name="DataController+createActivity"></a>

--------------------------------------------------------------------------------
### dataController.createActivity()
현재 워크플로우에 액티비티를 생성하는 Aras 팝업을 띄운다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
<a name="DataController+addInRel"></a>

--------------------------------------------------------------------------------
### dataController.addInRel(source, target, selectedTargetList)
지정된 마이 워크플로우의 소스와 아더 워크플로우의 타겟간에 릴레이션을 생성한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param | Description |
| --- | --- |
| source | OG-Tree data (My workflow) |
| target | OG-Tree data (Other workflow) |
| selectedTargetList | Array OG-Tree data (Other workflow) target 의 하위 아이템 데이터 |

<a name="DataController+deleteInRel"></a>

--------------------------------------------------------------------------------
### dataController.deleteInRel(sourceId, sourceType, targetId, targetType)
주어진 마이워크플로우 소스아이디와 아더워크플로우 타겟 아이디간의 릴레이션을 삭제한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param | Description |
| --- | --- |
| sourceId | Aras Item id (My workflow) |
| sourceType | "workflow","activity","folder","ed" |
| targetId | Aras Item id (Other workflow) |
| targetType | "workflow","activity","folder","ed" |

<a name="DataController+currentSortOrder"></a>

--------------------------------------------------------------------------------
### dataController.currentSortOrder() ⇒ <code>Object</code>
화면의 소트 메뉴로부터 현재 소트 지정값을 알아온다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>Object</code> - key : 소트 키, order : asc/desc  
<a name="DataController+createWorkFlowData"></a>

--------------------------------------------------------------------------------
### dataController.createWorkFlowData(resultNodeList, who, inout) ⇒ <code>Array</code>
Aras 의 메소드 리턴값을 오픈그래프 트리 데이터로 변환한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>Array</code> - json  

| Param | Description |
| --- | --- |
| resultNodeList | Aras 메소드 리턴값의 nodeList |
| who | 마이,아더 워크플로우 여부 other/my |
| inout | 인 데이터, 아웃데이터 여부 in/out |


* [.createWorkFlowData(resultNodeList, who, inout)](#DataController+createWorkFlowData) ⇒ <code>Array</code>
    * [~getStateColorAndStroke(type, state, isDelay)](#DataController+createWorkFlowData..getStateColorAndStroke) ⇒ <code>Object</code>
    * [~convertDate(dateStr)](#DataController+createWorkFlowData..convertDate) ⇒ <code>\*</code>
    * [~checkDelay(node)](#DataController+createWorkFlowData..checkDelay) ⇒ <code>boolean</code>

<a name="DataController+createWorkFlowData..getStateColorAndStroke"></a>

--------------------------------------------------------------------------------
#### createWorkFlowData~getStateColorAndStroke(type, state, isDelay) ⇒ <code>Object</code>
스테이트 컬러를 반환한다. 딜레이 값이 있을 경우 stroke 를 더한다.

**Kind**: inner method of <code>[createWorkFlowData](#DataController+createWorkFlowData)</code>  

| Param |
| --- |
| type | 
| state | 
| isDelay | 

<a name="DataController+createWorkFlowData..convertDate"></a>

--------------------------------------------------------------------------------
#### createWorkFlowData~convertDate(dateStr) ⇒ <code>\*</code>
월/일/년 형식의 데이터를 년월일 형식으로 교체한다.(ex) 20160901)

**Kind**: inner method of <code>[createWorkFlowData](#DataController+createWorkFlowData)</code>  

| Param |
| --- |
| dateStr | 

<a name="DataController+createWorkFlowData..checkDelay"></a>

--------------------------------------------------------------------------------
#### createWorkFlowData~checkDelay(node) ⇒ <code>boolean</code>
딜레이 여부를 반환한다.

**Kind**: inner method of <code>[createWorkFlowData](#DataController+createWorkFlowData)</code>  

| Param |
| --- |
| node | 

<a name="DataController+createMyWorkFlowData"></a>

--------------------------------------------------------------------------------
### dataController.createMyWorkFlowData(resultNodeList, inout) ⇒ <code>Array</code>
Aras 메소드 리턴값을 오픈그래프 마이워크플로우 데이터로 변환한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>Array</code> - json  

| Param | Description |
| --- | --- |
| resultNodeList | Aras 메소드 리턴값의 nodeList |
| inout | 인아웃 여부 |

<a name="DataController+createOtherWorkFlowData"></a>

--------------------------------------------------------------------------------
### dataController.createOtherWorkFlowData(resultNodeList) ⇒ <code>Array</code>
Aras 메소드 리턴값을 오픈그래프 아더워크플로우 데이터로 변환한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
**Returns**: <code>Array</code> - json  

| Param | Description |
| --- | --- |
| resultNodeList | Aras 메소드 리턴값의 nodeList |

<a name="DataController+refreshOtherWorkflow"></a>

--------------------------------------------------------------------------------
### dataController.refreshOtherWorkflow(wfId)
주어진 아더 워크플로우 아이디로 화면의 아더 워크플로우 트리를 갱신한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param | Description |
| --- | --- |
| wfId | 아더 워크플로우 아이디 |

<a name="DataController+refreshAll"></a>

--------------------------------------------------------------------------------
### dataController.refreshAll()
현재 화면의 아더, 마이 워크플로우를 모두 갱신한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
<a name="DataController+refreshMyWorkFlow"></a>

--------------------------------------------------------------------------------
### dataController.refreshMyWorkFlow()
현재 화면의 마이 워크플로우 트리를 갱신한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
<a name="DataController+refreshOutFolder"></a>

--------------------------------------------------------------------------------
### dataController.refreshOutFolder(data, view)
주어진 마이 워프클로우의 폴더의 하위 요소를 갱신한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param | Description |
| --- | --- |
| data | OG-Tree data |
| view | OG-Tree view data |

<a name="DataController+syncExpandDataWithTree"></a>

--------------------------------------------------------------------------------
### dataController.syncExpandDataWithTree(data)
주어진 오픈그래프 트리 데이터를 화면에 적용시키기 전에, 폴더의 열고 닫음 상태를 화면과 동기화시킨다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param | Description |
| --- | --- |
| data | OG-Tree array data |

<a name="DataController+getEDBTypeList"></a>

--------------------------------------------------------------------------------
### dataController.getEDBTypeList() ⇒ <code>\*</code> &#124; <code>Object</code>
EDB 타입 리스트를 불러온다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
<a name="DataController+getRelOtherPropsForEditor"></a>

--------------------------------------------------------------------------------
### dataController.getRelOtherPropsForEditor() ⇒ <code>\*</code> &#124; <code>Array</code>
현재 워크플로우와 연계된 아더워크플로우 목록을 가져온다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
<a name="DataController+getProjectMember"></a>

--------------------------------------------------------------------------------
### dataController.getProjectMember()
현재 워크플로우의 프로젝트 멤버 목록을 가져온다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
<a name="DataController+updatePromote"></a>

--------------------------------------------------------------------------------
### dataController.updatePromote(checkedList)
체크된 리스트에 대해 promote 처리한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param |
| --- |
| checkedList | 

<a name="DataController+updateOwner"></a>

--------------------------------------------------------------------------------
### dataController.updateOwner(checkedList, identityId)
체크된 리스트에 대하여 담당자를 변경한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param |
| --- |
| checkedList | 
| identityId | 

<a name="DataController+updateName"></a>

--------------------------------------------------------------------------------
### dataController.updateName(data, view, name)
오브젝트의 이름을 변경한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param |
| --- |
| data | 
| view | 
| name | 

<a name="DataController+convertMethodResultToJsonArray"></a>

--------------------------------------------------------------------------------
### dataController.convertMethodResultToJsonArray(result) ⇒ <code>Array</code>
메소드 리설트를 JSON 어레이 형식으로 변환한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param |
| --- |
| result | 

<a name="DataController+checkPM"></a>

--------------------------------------------------------------------------------
### dataController.checkPM() ⇒ <code>\*</code>
PM 자격을 조회한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
<a name="DataController+getProjectMapData"></a>

--------------------------------------------------------------------------------
### dataController.getProjectMapData()
챠크 맵데이터를 가져온다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
<a name="DataController+getKeyActivityList"></a>

--------------------------------------------------------------------------------
### dataController.getKeyActivityList() ⇒ <code>\*</code> &#124; <code>Object</code>
차트 헤더 리스트를 가져온다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
<a name="DataController+getEngFuncCodeList"></a>

--------------------------------------------------------------------------------
### dataController.getEngFuncCodeList() ⇒ <code>\*</code> &#124; <code>Object</code>
차트 row 리스트를 가져온다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
<a name="DataController+getObjActivityList"></a>

### dataController.getObjActivityList() ⇒ <code>\*</code> &#124; <code>Object</code>
챠트 액티비티 리스트를 가져온다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
<a name="DataController+saveMapData"></a>

--------------------------------------------------------------------------------
### dataController.saveMapData(mapDataJson) ⇒ <code>\*</code> &#124; <code>Object</code>
차트 맵 데이터를 저장한다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  

| Param |
| --- |
| mapDataJson | 

<a name="DataController+getChartData"></a>

--------------------------------------------------------------------------------
### dataController.getChartData() ⇒ <code>Object</code>
차트맵, 헤더, 로우, 액티비티를 가져와 조합하여 렌더러에서 사용하는 데이터 형식으로 돌려준다.

**Kind**: instance method of <code>[DataController](#DataController)</code>  
<a name="DataController..stateJson"></a>

--------------------------------------------------------------------------------
### DataController~stateJson
스테이트 정의가 저장되어 있는 파일을 불러온다.

**Kind**: inner property of <code>[DataController](#DataController)</code>  
<a name="DataController..chartStateJson"></a>

--------------------------------------------------------------------------------
### DataController~chartStateJson
챠트 스테이트 정의가 저장되어 있는 파일을 불러온다.

**Kind**: inner property of <code>[DataController](#DataController)</code>  
