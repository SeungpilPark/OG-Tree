<a name="EditorRenderer"></a>

## EditorRenderer
**Kind**: global class  
**Requires**: <code>module:OG.\*</code>  
**Author:** <a href="mailto:sppark@uengine.org">Seungpil Park</a>  

* [EditorRenderer](#EditorRenderer)
    * [new EditorRenderer(container, viewController)](#new_EditorRenderer_new)
    * [.init()](#EditorRenderer+init)
    * [.getScale()](#EditorRenderer+getScale) ⇒ <code>Number</code>
    * [.setScale(scale)](#EditorRenderer+setScale)
    * [.setShowLabel(show)](#EditorRenderer+setShowLabel)
    * [.drawArea()](#EditorRenderer+drawArea)
    * [.clear()](#EditorRenderer+clear)
    * [.loadViewData()](#EditorRenderer+loadViewData) ⇒ <code>Array</code>
    * [.load()](#EditorRenderer+load) ⇒ <code>Array</code>
    * [.loadByFilter(filterData)](#EditorRenderer+loadByFilter) ⇒ <code>Array</code>
    * [.removeDataByFilter(filterData)](#EditorRenderer+removeDataByFilter)
    * [.clearData(preventRender)](#EditorRenderer+clearData)
    * [.sortData(prop, positions, desc, preventRender)](#EditorRenderer+sortData)
    * [.updateData(data, preventRender)](#EditorRenderer+updateData)
    * [.render()](#EditorRenderer+render)
    * [.createViewData()](#EditorRenderer+createViewData) ⇒ <code>Object</code>
        * [~getViewData(object, depth, parentView, childFromParent)](#EditorRenderer+createViewData..getViewData)
    * [.createStandaloneViewData(mapping, targetActivityView)](#EditorRenderer+createStandaloneViewData) ⇒ <code>Object</code>
    * [.renderViews()](#EditorRenderer+renderViews)
    * [.labelSubstring(label)](#EditorRenderer+labelSubstring) ⇒ <code>String</code>
    * [.updateActivity(view, element)](#EditorRenderer+updateActivity)
    * [.drawActivity(view)](#EditorRenderer+drawActivity)
    * [.updateFolder(view, element)](#EditorRenderer+updateFolder)
    * [.drawFolder(view)](#EditorRenderer+drawFolder)
    * [.updateEd(view, element)](#EditorRenderer+updateEd)
    * [.drawEd(view)](#EditorRenderer+drawEd)
    * [.drawMappingLine(view)](#EditorRenderer+drawMappingLine)
    * [.updateExpanderLine(view, element)](#EditorRenderer+updateExpanderLine)
    * [.drawExpanderLine(view)](#EditorRenderer+drawExpanderLine)
    * [.drawActivityRelLine(view)](#EditorRenderer+drawActivityRelLine)
    * [.updateExpander(view, element)](#EditorRenderer+updateExpander)
    * [.drawExpander(view)](#EditorRenderer+drawExpander)
    * [.getExpanderCenterX(position, depth, standardX)](#EditorRenderer+getExpanderCenterX) ⇒ <code>Number</code>
    * [.getShapeCenterX(position, depth, standardX)](#EditorRenderer+getShapeCenterX) ⇒ <code>Number</code>
    * [.getMappingEdgeVertices(depth, parentY, myY, pStandardX, myStandardX, hasChild)](#EditorRenderer+getMappingEdgeVertices) ⇒ <code>Array</code>
    * [.getActivityRelVertices(position, depth, standardX, parentY, myY)](#EditorRenderer+getActivityRelVertices) ⇒ <code>Array</code>
    * [.getExpanderToVertices(position, depth, standardX, parentY, myY)](#EditorRenderer+getExpanderToVertices) ⇒ <code>Array</code>
    * [.getExpanderFromVertices(position, depth, standardX, parentY, myY)](#EditorRenderer+getExpanderFromVertices) ⇒ <code>Array</code>
    * [.dividedViewsByPosition(displayViews)](#EditorRenderer+dividedViewsByPosition) ⇒ <code>Object</code>
    * [.reRangeAreaSize(viewData)](#EditorRenderer+reRangeAreaSize)
    * [.fitToBoundary(element, offset[upper,low,left,right, width,height,left,top)](#EditorRenderer+fitToBoundary) ⇒ <code>element</code>
    * [.selectActivityByPosition(position)](#EditorRenderer+selectActivityByPosition) ⇒ <code>Array</code>
    * [.selectNextActivity(id)](#EditorRenderer+selectNextActivity) ⇒ <code>Object</code>
    * [.selectPrevActivity(id)](#EditorRenderer+selectPrevActivity) ⇒ <code>Object</code>
    * [.selectNextActivities(id)](#EditorRenderer+selectNextActivities) ⇒ <code>Array</code>
    * [.selectChildById(id)](#EditorRenderer+selectChildById) ⇒ <code>Array</code>
    * [.selectChildMapping(sourceId, targetId)](#EditorRenderer+selectChildMapping) ⇒ <code>Array</code>
    * [.selectRecursiveChildMapping(sourceId, targetId)](#EditorRenderer+selectRecursiveChildMapping) ⇒ <code>Array</code>
    * [.selectParentById(id)](#EditorRenderer+selectParentById) ⇒ <code>Object</code>
    * [.selectParentMapping(sourceId, targetId)](#EditorRenderer+selectParentMapping) ⇒ <code>Object</code>
    * [.selectById(id)](#EditorRenderer+selectById) ⇒ <code>Object</code>
    * [.selectBySourceTarget(sourceId, targetId)](#EditorRenderer+selectBySourceTarget) ⇒ <code>Object</code>
    * [.selectMappings()](#EditorRenderer+selectMappings) ⇒ <code>Array</code>
    * [.selectRootActivityById(id)](#EditorRenderer+selectRootActivityById) ⇒ <code>Object</code>
    * [.selectRootMapping(sourceId, targetId)](#EditorRenderer+selectRootMapping) ⇒ <code>Object</code>
    * [.selectRecursiveParentById(id)](#EditorRenderer+selectRecursiveParentById) ⇒ <code>Array</code>
    * [.selectRecursiveChildById(id)](#EditorRenderer+selectRecursiveChildById) ⇒ <code>Array</code>
    * [.removeRecursiveChildById(id)](#EditorRenderer+removeRecursiveChildById) ⇒ <code>Array</code>
    * [.selectRecursiveLastChildById(id)](#EditorRenderer+selectRecursiveLastChildById) ⇒ <code>Array</code>
    * [.selectViewById(viewData, id)](#EditorRenderer+selectViewById) ⇒ <code>Object</code>
    * [.selectViewByFilter(viewData, filterData)](#EditorRenderer+selectViewByFilter) ⇒ <code>Array</code>
    * [.selectRecursiveChildViewsById(viewData, id)](#EditorRenderer+selectRecursiveChildViewsById) ⇒ <code>Array</code>
    * [.selectMaxyFromViews(views)](#EditorRenderer+selectMaxyFromViews) ⇒ <code>number</code>
    * [.selectMaxDepthFromViews(views)](#EditorRenderer+selectMaxDepthFromViews) ⇒ <code>number</code>
    * [.selectMaxBottomFromViews(views)](#EditorRenderer+selectMaxBottomFromViews) ⇒ <code>number</code>
    * [.emptyString(value)](#EditorRenderer+emptyString) ⇒ <code>boolean</code>
    * [.getElementByPoint(point)](#EditorRenderer+getElementByPoint) ⇒ <code>Element</code>
    * [.uuid()](#EditorRenderer+uuid) ⇒ <code>string</code>
    * [.bindEvent()](#EditorRenderer+bindEvent)
    * [.bindTooltip(element)](#EditorRenderer+bindTooltip)
    * [.bindCheckBoxClickEvent(shape)](#EditorRenderer+bindCheckBoxClickEvent)
    * [.bindDblClickEvent(element)](#EditorRenderer+bindDblClickEvent)
    * [.bindMappingHighLight(element)](#EditorRenderer+bindMappingHighLight)
    * [.bindActivityMove()](#EditorRenderer+bindActivityMove)
    * [.onBeforeActivityMove(activities)](#EditorRenderer+onBeforeActivityMove)
    * [.onActivityMove(activities)](#EditorRenderer+onActivityMove)
    * [.bindMappingEvent()](#EditorRenderer+bindMappingEvent)
    * [.deleteMapping(data, view)](#EditorRenderer+deleteMapping)
    * [.enableShapeContextMenu()](#EditorRenderer+enableShapeContextMenu)
    * [.getCheckedList()](#EditorRenderer+getCheckedList)
    * [.makeNameChange(element, data, view)](#EditorRenderer+makeNameChange) ⇒ <code>Object</code>
    * [.makeShowProperties()](#EditorRenderer+makeShowProperties) ⇒ <code>Object</code>
    * [.makeFolder()](#EditorRenderer+makeFolder) ⇒ <code>Object</code>
    * [.makeEd()](#EditorRenderer+makeEd) ⇒ <code>Object</code>
    * [.makePickEd()](#EditorRenderer+makePickEd) ⇒ <code>Object</code>
    * [.makeDelete()](#EditorRenderer+makeDelete) ⇒ <code>Object</code>
    * [.makeListRelation()](#EditorRenderer+makeListRelation) ⇒ <code>Object</code>
    * [.makeDeleteRelation()](#EditorRenderer+makeDeleteRelation) ⇒ <code>Object</code>
    * [.onBeforeMapping(source, target, selectedTargetList)](#EditorRenderer+onBeforeMapping) ⇒ <code>boolean</code>
    * [.onMapping(source, target, selectedTargetList)](#EditorRenderer+onMapping) ⇒ <code>boolean</code>
    * [.onBeforeDeleteMapping(sourceId, sourceType, targetId, targetType)](#EditorRenderer+onBeforeDeleteMapping) ⇒ <code>boolean</code>
    * [.onDeleteMapping(sourceId, sourceType, targetId, targetType)](#EditorRenderer+onDeleteMapping) ⇒ <code>boolean</code>

<a name="new_EditorRenderer_new"></a>

--------------------------------------------------------------------------------
### new EditorRenderer(container, viewController)
Open graph Tree Library (OG-Tree)


| Param | Type | Description |
| --- | --- | --- |
| container | <code>String</code> | Dom Element Id |
| viewController | <code>EditorViewController</code> |  |

<a name="EditorRenderer+init"></a>

--------------------------------------------------------------------------------
### editorRenderer.init()
캔버스를 초기 빌드한다.  최초 1번만 실행된다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+getScale"></a>

--------------------------------------------------------------------------------
### editorRenderer.getScale() ⇒ <code>Number</code>
Scale 을 반환한다. (리얼 사이즈 : Scale = 1)

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Number</code> - 스케일값  
<a name="EditorRenderer+setScale"></a>

--------------------------------------------------------------------------------
### editorRenderer.setScale(scale)
Scale 을 설정한다. (기본 사이즈 : Scale = 1)

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| scale | <code>Number</code> | 스케일값 |

<a name="EditorRenderer+setShowLabel"></a>

--------------------------------------------------------------------------------
### editorRenderer.setShowLabel(show)
라벨을 숨김/ 보임 처리한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| show | 보임 여부 |

<a name="EditorRenderer+drawArea"></a>

--------------------------------------------------------------------------------
### editorRenderer.drawArea()
기본 Area 를 생성한다.
lAc,lOut,rIn,rAc,rOut,Canvas

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+clear"></a>

--------------------------------------------------------------------------------
### editorRenderer.clear()
캔버스의 모든 화면요소와 데이터를 삭제한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+loadViewData"></a>

--------------------------------------------------------------------------------
### editorRenderer.loadViewData() ⇒ <code>Array</code>
뷰 데이터를 불러온다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - OG-Tree view data  
<a name="EditorRenderer+load"></a>

--------------------------------------------------------------------------------
### editorRenderer.load() ⇒ <code>Array</code>
노드 데이터를 불러온다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - OG-Tree data  
<a name="EditorRenderer+loadByFilter"></a>

--------------------------------------------------------------------------------
### editorRenderer.loadByFilter(filterData) ⇒ <code>Array</code>
노드 데이터를 필터링하여 불러온다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| filterData | json |

<a name="EditorRenderer+removeDataByFilter"></a>

--------------------------------------------------------------------------------
### editorRenderer.removeDataByFilter(filterData)
노드 데이터를 필터링 하여 삭제한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| filterData | json |

<a name="EditorRenderer+clearData"></a>

--------------------------------------------------------------------------------
### editorRenderer.clearData(preventRender)
노드 데이터를 모두 삭제한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| preventRender | 화면 리로드 여부 |

<a name="EditorRenderer+sortData"></a>

--------------------------------------------------------------------------------
### editorRenderer.sortData(prop, positions, desc, preventRender)
트리의 데이터를 주어진 prop 로 소트한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| prop | 소트 키 |
| positions | Array of Area position |
| desc | 역순 여부 |
| preventRender | 화면 리로드 여부 |

<a name="EditorRenderer+updateData"></a>

--------------------------------------------------------------------------------
### editorRenderer.updateData(data, preventRender)
데이터를 업데이트한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| data | OG-Tree data |
| preventRender | 화면 리로드 여부 |

<a name="EditorRenderer+render"></a>

--------------------------------------------------------------------------------
### editorRenderer.render()
스토리지의 데이터를 기반으로 화면에 렌더링한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+createViewData"></a>

--------------------------------------------------------------------------------
### editorRenderer.createViewData() ⇒ <code>Object</code>
스토리지의 데이터를 기반으로 화면에 표현되야 하는 각 객체의 y 좌표를 생성한 ViewData 를 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+createViewData..getViewData"></a>

--------------------------------------------------------------------------------
#### createViewData~getViewData(object, depth, parentView, childFromParent)
주어진 객체의 좌표를 생성하여 viewData 에 저장하고, 객체에 자식이 있다면 함수를 반복수행한다.

**Kind**: inner method of <code>[createViewData](#EditorRenderer+createViewData)</code>  

| Param |
| --- |
| object | 
| depth | 
| parentView | 
| childFromParent | 

<a name="EditorRenderer+createStandaloneViewData"></a>

--------------------------------------------------------------------------------
### editorRenderer.createStandaloneViewData(mapping, targetActivityView) ⇒ <code>Object</code>
매핑 시킬 아더워크플로우가 없는 인 데이터들로 viewData 를 구성한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| mapping | OG-Tree data |
| targetActivityView | OG-Tree view data |

<a name="EditorRenderer+renderViews"></a>

--------------------------------------------------------------------------------
### editorRenderer.renderViews()
viewData 중에서 실제로 화면에 표현되야 할 객체를 선정하고 각 x 좌표를 책정한다.
선정된 객체들을 화면에 드로잉한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+labelSubstring"></a>

--------------------------------------------------------------------------------
### editorRenderer.labelSubstring(label) ⇒ <code>String</code>
주어진 라벨이 최대 표기 숫자를 넘길 경우 텍스트를 줄인다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>String</code> - fixed label  

| Param | Description |
| --- | --- |
| label | 라벨 |

<a name="EditorRenderer+updateActivity"></a>

--------------------------------------------------------------------------------
### editorRenderer.updateActivity(view, element)
액티비티 아이템을 업데이트 한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |
| element | OG-Tree Dom Element |

<a name="EditorRenderer+drawActivity"></a>

--------------------------------------------------------------------------------
### editorRenderer.drawActivity(view)
액티비티 아이템을 드로잉한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |

<a name="EditorRenderer+updateFolder"></a>

--------------------------------------------------------------------------------
### editorRenderer.updateFolder(view, element)
폴더 아이템을 업데이트한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |
| element | OG-Tree Dom Element |

<a name="EditorRenderer+drawFolder"></a>

--------------------------------------------------------------------------------
### editorRenderer.drawFolder(view)
폴더 아이템을 드로잉한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |

<a name="EditorRenderer+updateEd"></a>

--------------------------------------------------------------------------------
### editorRenderer.updateEd(view, element)
ED 아이템을 업데이트 한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |
| element | OG-Tree Dom Element |

<a name="EditorRenderer+drawEd"></a>

--------------------------------------------------------------------------------
### editorRenderer.drawEd(view)
ED 아이템을 드로잉한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |

<a name="EditorRenderer+drawMappingLine"></a>

--------------------------------------------------------------------------------
### editorRenderer.drawMappingLine(view)
매핑 연결선을 드로잉한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |

<a name="EditorRenderer+updateExpanderLine"></a>

--------------------------------------------------------------------------------
### editorRenderer.updateExpanderLine(view, element)
expander 선연결을 업데이트한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |
| element | OG-Tree Dom Element |

<a name="EditorRenderer+drawExpanderLine"></a>

--------------------------------------------------------------------------------
### editorRenderer.drawExpanderLine(view)
expander 선연결을 생성한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |

<a name="EditorRenderer+drawActivityRelLine"></a>

--------------------------------------------------------------------------------
### editorRenderer.drawActivityRelLine(view)
액티비티간의 연결선을 드로잉한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |

<a name="EditorRenderer+updateExpander"></a>

--------------------------------------------------------------------------------
### editorRenderer.updateExpander(view, element)
expander 를 업데이트한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |
| element | OG-Tree Dom Element |

<a name="EditorRenderer+drawExpander"></a>

--------------------------------------------------------------------------------
### editorRenderer.drawExpander(view)
expander 를 드로잉한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |

<a name="EditorRenderer+getExpanderCenterX"></a>

--------------------------------------------------------------------------------
### editorRenderer.getExpanderCenterX(position, depth, standardX) ⇒ <code>Number</code>
expander 의 센터를 구한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Number</code> - center X 좌표  

| Param | Description |
| --- | --- |
| position | Area position |
| depth | 아이템 depth |
| standardX | Area X 좌표 |

<a name="EditorRenderer+getShapeCenterX"></a>

--------------------------------------------------------------------------------
### editorRenderer.getShapeCenterX(position, depth, standardX) ⇒ <code>Number</code>
액티비티, 폴더, Ed 의 센터를 구한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Number</code> - center X 좌표  

| Param | Description |
| --- | --- |
| position | Area position |
| depth | 아이템 depth |
| standardX | Area X 좌표 |

<a name="EditorRenderer+getMappingEdgeVertices"></a>

--------------------------------------------------------------------------------
### editorRenderer.getMappingEdgeVertices(depth, parentY, myY, pStandardX, myStandardX, hasChild) ⇒ <code>Array</code>
매핑 연결선의 vertices 를 구한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - vertices  

| Param | Description |
| --- | --- |
| depth | 아이템 depth |
| parentY | 매핑 대상 액티비티 Y 좌표 |
| myY | 자신의 Y 좌표 |
| pStandardX | 매핑 대상 액티비티 Area X 좌표 |
| myStandardX | 자신의 Area X 좌표 |
| hasChild | 자식이 있는지 여부 |

<a name="EditorRenderer+getActivityRelVertices"></a>

--------------------------------------------------------------------------------
### editorRenderer.getActivityRelVertices(position, depth, standardX, parentY, myY) ⇒ <code>Array</code>
액티비티간의 연결선의 vertices 를 구한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - vertices  

| Param | Description |
| --- | --- |
| position | Area position |
| depth | 아이템 depth |
| standardX | Area X 좌표 |
| parentY | 연결대상 액티비티 Y 좌표 |
| myY | 자신의 Y 좌표 |

<a name="EditorRenderer+getExpanderToVertices"></a>

--------------------------------------------------------------------------------
### editorRenderer.getExpanderToVertices(position, depth, standardX, parentY, myY) ⇒ <code>Array</code>
Expander To 선의 vertices 를 구한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - vertices  

| Param | Description |
| --- | --- |
| position | Area position |
| depth | 아이템 depth |
| standardX | Area X 좌표 |
| parentY | 부모 아이템의 Y 좌표 |
| myY | 자신의 Y 좌표 |

<a name="EditorRenderer+getExpanderFromVertices"></a>

--------------------------------------------------------------------------------
### editorRenderer.getExpanderFromVertices(position, depth, standardX, parentY, myY) ⇒ <code>Array</code>
Expander From 선의 vertices 를 구한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - vertices  

| Param | Description |
| --- | --- |
| position | Area position |
| depth | 아이템 depth |
| standardX | Area X 좌표 |
| parentY | 부모 아이템의 Y 좌표 |
| myY | 자신의 Y 좌표 |

<a name="EditorRenderer+dividedViewsByPosition"></a>

--------------------------------------------------------------------------------
### editorRenderer.dividedViewsByPosition(displayViews) ⇒ <code>Object</code>
주어진 views 를 포지션별로 분류하여 리턴한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Object</code> - HashMap of OG-Tree view data  

| Param | Description |
| --- | --- |
| displayViews | Array of OG-Tree view data |

<a name="EditorRenderer+reRangeAreaSize"></a>

--------------------------------------------------------------------------------
### editorRenderer.reRangeAreaSize(viewData)
각 Area 의 크기를 책정하고 redraw 한다.
캔버스의 사이즈를 재조정한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| viewData | HashMap of OG-Tree view data |

<a name="EditorRenderer+fitToBoundary"></a>

--------------------------------------------------------------------------------
### editorRenderer.fitToBoundary(element, offset[upper,low,left,right, width,height,left,top) ⇒ <code>element</code>
주어진 Boundary 영역 안으로 공간 기하 객체를 적용한다.(이동 & 리사이즈)

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>element</code> - OG-Tree Dom Element  

| Param | Description |
| --- | --- |
| element | OG-Tree Dom Element |
| offset[upper,low,left,right |  |
| width,height,left,top |  |

<a name="EditorRenderer+selectActivityByPosition"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectActivityByPosition(position) ⇒ <code>Array</code>
주어진 에어리어에 해당하는 액티비티 정보를 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| position | Area position |

<a name="EditorRenderer+selectNextActivity"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectNextActivity(id) ⇒ <code>Object</code>
주어진 id 의 액티비티의 next 액티비티를 구한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| id | 액티비티 id |

<a name="EditorRenderer+selectPrevActivity"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectPrevActivity(id) ⇒ <code>Object</code>
주어진 id 의 prev 액티비티를 구한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| id | 액티비티 id |

<a name="EditorRenderer+selectNextActivities"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectNextActivities(id) ⇒ <code>Array</code>
주어진 id 의 next 액티비티들을 구한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| id | 액티비티 id |

<a name="EditorRenderer+selectChildById"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectChildById(id) ⇒ <code>Array</code>
주어진 아이디의 자식 데이터를 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| id | OG-Tree data id |

<a name="EditorRenderer+selectChildMapping"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectChildMapping(sourceId, targetId) ⇒ <code>Array</code>
주어진 소스와 타켓 아이디를 가지는 매핑 데이터의 자식을 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| sourceId | OG-Tree data id |
| targetId | OG-Tree data id |

<a name="EditorRenderer+selectRecursiveChildMapping"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectRecursiveChildMapping(sourceId, targetId) ⇒ <code>Array</code>
주어진 소스와 타겟 아이디를 가지는 매핑 데이터의 자식을 재귀호출하여 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| sourceId | OG-Tree data id |
| targetId | OG-Tree data id |

<a name="EditorRenderer+selectParentById"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectParentById(id) ⇒ <code>Object</code>
주어진 아이디의 부모정보를 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| id | OG-Tree data id |

<a name="EditorRenderer+selectParentMapping"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectParentMapping(sourceId, targetId) ⇒ <code>Object</code>
매핑 데이터의 부모 매핑 데이터를 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| sourceId | OG-Tree data id |
| targetId | OG-Tree data id |

<a name="EditorRenderer+selectById"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectById(id) ⇒ <code>Object</code>
주어진 아이디의 정보를 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| id | OG-Tree data id |

<a name="EditorRenderer+selectBySourceTarget"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectBySourceTarget(sourceId, targetId) ⇒ <code>Object</code>
주어진 소스아이디와 타겟아이디와 일치하는 OG-Tree 데이터를 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| sourceId | OG-Tree data id |
| targetId | OG-Tree data id |

<a name="EditorRenderer+selectMappings"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectMappings() ⇒ <code>Array</code>
매핑 데이터를 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  
<a name="EditorRenderer+selectRootActivityById"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectRootActivityById(id) ⇒ <code>Object</code>
주어진 아이디의 루트 액티비티 정보를 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| id | OG-Tree data id |

<a name="EditorRenderer+selectRootMapping"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectRootMapping(sourceId, targetId) ⇒ <code>Object</code>
매핑 데이터의 루트를 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| sourceId | OG-Tree data id |
| targetId | OG-Tree data id |

<a name="EditorRenderer+selectRecursiveParentById"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectRecursiveParentById(id) ⇒ <code>Array</code>
주어진 아이디의 부모 일람을 재귀호출하여 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| id | OG-Tree data id |

<a name="EditorRenderer+selectRecursiveChildById"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectRecursiveChildById(id) ⇒ <code>Array</code>
주어진 아이디의 자식 데이터를 재귀호출하여 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| id | OG-Tree data id |

<a name="EditorRenderer+removeRecursiveChildById"></a>

--------------------------------------------------------------------------------
### editorRenderer.removeRecursiveChildById(id) ⇒ <code>Array</code>
주어진 아이디의 자식 데이터를 재귀호출하여 삭제한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| id | OG-Tree data id |

<a name="EditorRenderer+selectRecursiveLastChildById"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectRecursiveLastChildById(id) ⇒ <code>Array</code>
주어진 아이디의 자식 데이터를 재귀호출하여, 더이상 자식이 없는 마지막 데이터일 경우의 리스트를 반환한다.
(자기 자신이 마지막 데이터일 경우 자기 자신을 포함하여)

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| id | OG-Tree data id |

<a name="EditorRenderer+selectViewById"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectViewById(viewData, id) ⇒ <code>Object</code>
주어진 아이디에 해당하는 뷰 데이터를 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Object</code> - OG-Tree view data id  

| Param | Description |
| --- | --- |
| viewData | Hashmap of OG-Tree view data |
| id | OG-Tree view data id |

<a name="EditorRenderer+selectViewByFilter"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectViewByFilter(viewData, filterData) ⇒ <code>Array</code>
주어진 필터 조건에 따라 뷰데이터를 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree view data  

| Param | Description |
| --- | --- |
| viewData | HashMap of OG-Tree view data |
| filterData | HashMap filter data |

<a name="EditorRenderer+selectRecursiveChildViewsById"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectRecursiveChildViewsById(viewData, id) ⇒ <code>Array</code>
주어진 아이디의 자식 뷰 데이터를 재귀호출하여 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree view data  

| Param | Description |
| --- | --- |
| viewData | HashMap of OG-Tree view data |
| id | OG-Tree view data id |

<a name="EditorRenderer+selectMaxyFromViews"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectMaxyFromViews(views) ⇒ <code>number</code>
주어진 views 중 가장 큰 y 를 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>number</code> - max Y  

| Param | Description |
| --- | --- |
| views | Array of OG-Tree view data |

<a name="EditorRenderer+selectMaxDepthFromViews"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectMaxDepthFromViews(views) ⇒ <code>number</code>
주어진 views 중 가장 큰 depth 를 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>number</code> - max depth  

| Param | Description |
| --- | --- |
| views | Array of OG-Tree view data |

<a name="EditorRenderer+selectMaxBottomFromViews"></a>

--------------------------------------------------------------------------------
### editorRenderer.selectMaxBottomFromViews(views) ⇒ <code>number</code>
주어진 views 중 가장 큰 bottom 을 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>number</code> - max bottom  

| Param | Description |
| --- | --- |
| views | Array of OG-Tree view data |

<a name="EditorRenderer+emptyString"></a>

--------------------------------------------------------------------------------
### editorRenderer.emptyString(value) ⇒ <code>boolean</code>
주어진 스트링이 빈값인지를 확인한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>boolean</code> - 빈 값 여부  

| Param | Description |
| --- | --- |
| value | String |

<a name="EditorRenderer+getElementByPoint"></a>

--------------------------------------------------------------------------------
### editorRenderer.getElementByPoint(point) ⇒ <code>Element</code>
좌표값을 포함하는 가장 앞단의 엘리먼트를 반환한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>Element</code> - OG-Tree Dom Element  

| Param | Description |
| --- | --- |
| point | [x,y] 좌표 |

<a name="EditorRenderer+uuid"></a>

--------------------------------------------------------------------------------
### editorRenderer.uuid() ⇒ <code>string</code>
무작위 랜덤 아이디 생성

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
**Returns**: <code>string</code> - 랜덤 아이디  
<a name="EditorRenderer+bindEvent"></a>

--------------------------------------------------------------------------------
### editorRenderer.bindEvent()
캔버스가 처음 렌더링 될 시 필요한 이벤트들을 바인딩한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+bindTooltip"></a>

--------------------------------------------------------------------------------
### editorRenderer.bindTooltip(element)
툴팁 이벤트를 바인딩한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| element | OG-Tree Dom Element |

<a name="EditorRenderer+bindCheckBoxClickEvent"></a>

--------------------------------------------------------------------------------
### editorRenderer.bindCheckBoxClickEvent(shape)
shape 의 체크박스 클릭시 하위의 모든 아이템도 적용되도록 한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param |
| --- |
| shape | 

<a name="EditorRenderer+bindDblClickEvent"></a>

--------------------------------------------------------------------------------
### editorRenderer.bindDblClickEvent(element)
더블클릭 이벤트를 바인딩한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| element | OG-Tree Dom Element |

<a name="EditorRenderer+bindMappingHighLight"></a>

--------------------------------------------------------------------------------
### editorRenderer.bindMappingHighLight(element)
매핑 연결선의 하이라이트 이벤트를 바인딩한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| element | OG-Tree Dom Element |

<a name="EditorRenderer+bindActivityMove"></a>

--------------------------------------------------------------------------------
### editorRenderer.bindActivityMove()
액티비티의 이동 이벤트를 바인딩한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+onBeforeActivityMove"></a>

--------------------------------------------------------------------------------
### editorRenderer.onBeforeActivityMove(activities)
액티비티가 이동되기 전 이벤트

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| activities | Array of OG-Tree data |

<a name="EditorRenderer+onActivityMove"></a>

--------------------------------------------------------------------------------
### editorRenderer.onActivityMove(activities)
액티비티가 이동 된 후 이벤트

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| activities | Array of OG-Tree data |

<a name="EditorRenderer+bindMappingEvent"></a>

--------------------------------------------------------------------------------
### editorRenderer.bindMappingEvent()
매핑이 이루어졌을 떄의 이벤트를 처리한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+deleteMapping"></a>

--------------------------------------------------------------------------------
### editorRenderer.deleteMapping(data, view)
매핑을 해제한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| data | OG-Tree data |
| view | OG-Tree view |

<a name="EditorRenderer+enableShapeContextMenu"></a>

--------------------------------------------------------------------------------
### editorRenderer.enableShapeContextMenu()
OG Tree Dom Element 에 마우스 우클릭 메뉴를 가능하게 한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+getCheckedList"></a>

--------------------------------------------------------------------------------
### editorRenderer.getCheckedList()
체크박스에 체크된 리스트를 가져온다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+makeNameChange"></a>

--------------------------------------------------------------------------------
### editorRenderer.makeNameChange(element, data, view) ⇒ <code>Object</code>
이름 변경 콘텍스트 메뉴를 생성한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param |
| --- |
| element | 
| data | 
| view | 

<a name="EditorRenderer+makeShowProperties"></a>

### editorRenderer.makeShowProperties() ⇒ <code>Object</code>
프로퍼티 보기 콘텍스트 메뉴를 생성한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+makeFolder"></a>

### editorRenderer.makeFolder() ⇒ <code>Object</code>
폴더 생성 콘텍스트 메뉴를 생성한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+makeEd"></a>

### editorRenderer.makeEd() ⇒ <code>Object</code>
ED 생성 콘텍스트 메뉴를 생성한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+makePickEd"></a>

### editorRenderer.makePickEd() ⇒ <code>Object</code>
Pick ED 콘텍스트 메뉴를 생성한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+makeDelete"></a>

### editorRenderer.makeDelete() ⇒ <code>Object</code>
삭제 콘텍스트 메뉴를 생성한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+makeListRelation"></a>

### editorRenderer.makeListRelation() ⇒ <code>Object</code>
List Relation 콘텍스트 메뉴를 생성한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+makeDeleteRelation"></a>

### editorRenderer.makeDeleteRelation() ⇒ <code>Object</code>
매핑 삭제 콘텍스트 메뉴를 생성한다.

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  
<a name="EditorRenderer+onBeforeMapping"></a>

### editorRenderer.onBeforeMapping(source, target, selectedTargetList) ⇒ <code>boolean</code>
매핑이 이루어지기 전 이벤트

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| source | OG-Tree data 드래그 한 대상 |
| target | OG-Tree data 드랍 한 대상 |
| selectedTargetList | Array of OG-Tree data 드래그 대상의 하위 요소들 |

<a name="EditorRenderer+onMapping"></a>

### editorRenderer.onMapping(source, target, selectedTargetList) ⇒ <code>boolean</code>
매핑이 이루어졌을 때의 이벤트

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| source | OG-Tree data 드래그 한 대상 |
| target | OG-Tree data 드랍 한 대상 |
| selectedTargetList | Array of OG-Tree data 드래그 대상의 하위 요소들 |

<a name="EditorRenderer+onBeforeDeleteMapping"></a>

### editorRenderer.onBeforeDeleteMapping(sourceId, sourceType, targetId, targetType) ⇒ <code>boolean</code>
매핑을 삭제하기 전 이벤트

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| sourceId | OG-Tree data id 드래그 한 대상 |
| sourceType | "workflow","activity","folder","ed" |
| targetId | OG-Tree data id 드랍 한 대상 |
| targetType | "workflow","activity","folder","ed" |

<a name="EditorRenderer+onDeleteMapping"></a>

### editorRenderer.onDeleteMapping(sourceId, sourceType, targetId, targetType) ⇒ <code>boolean</code>
매핑을 삭제한 후 이벤트

**Kind**: instance method of <code>[EditorRenderer](#EditorRenderer)</code>  

| Param | Description |
| --- | --- |
| sourceId | OG-Tree data id 드래그 한 대상 |
| sourceType | "workflow","activity","folder","ed" |
| targetId | OG-Tree data id 드랍 한 대상 |
| targetType | "workflow","activity","folder","ed" |

