<a name="ChartRenderer"></a>

## ChartRenderer
**Kind**: global class  
**Requires**: <code>module:OG.\*</code>  
**Author:** <a href="mailto:sppark@uengine.org">Seungpil Park</a>  

* [ChartRenderer](#ChartRenderer)
    * [new ChartRenderer(container, viewController)](#new_ChartRenderer_new)
    * [.dataTable](#ChartRenderer+dataTable) : <code>null</code>
    * [.finalRowData](#ChartRenderer+finalRowData) : <code>Array</code>
    * [.connections](#ChartRenderer+connections) : <code>Array</code>
    * [.existConnections](#ChartRenderer+existConnections) : <code>Array</code>
    * [.existCells](#ChartRenderer+existCells) : <code>Array</code>
    * [.init()](#ChartRenderer+init)
    * [.getScale()](#ChartRenderer+getScale) ⇒ <code>Number</code>
    * [.setScale(scale)](#ChartRenderer+setScale)
    * [.getColumnByField(columns, field)](#ChartRenderer+getColumnByField) ⇒ <code>\*</code>
    * [.getColorFromState(state)](#ChartRenderer+getColorFromState) ⇒ <code>\*</code>
    * [.getDataTableRenderer()](#ChartRenderer+getDataTableRenderer) ⇒ <code>tableRenderer</code>
    * [.getDataRowByCode(funcCode, rows, rowIndexMapByCode)](#ChartRenderer+getDataRowByCode) ⇒ <code>\*</code>
    * [.getExistActivityFromRowsData(activity, rows)](#ChartRenderer+getExistActivityFromRowsData) ⇒ <code>\*</code>
    * [.getElementByActivityId(activityId)](#ChartRenderer+getElementByActivityId) ⇒ <code>\*</code>
    * [.keepEdges()](#ChartRenderer+keepEdges) ⇒ <code>Array</code>
    * [.renderByContainer()](#ChartRenderer+renderByContainer)
    * [.renderEdges()](#ChartRenderer+renderEdges)
    * [.render(chartData, existJson)](#ChartRenderer+render)
    * [.labelSubstring(label)](#ChartRenderer+labelSubstring) ⇒ <code>String</code>
    * [.emptyString(value)](#ChartRenderer+emptyString) ⇒ <code>boolean</code>
    * [.getElementByPoint(point)](#ChartRenderer+getElementByPoint) ⇒ <code>Element</code>
    * [.uuid()](#ChartRenderer+uuid) ⇒ <code>string</code>
    * [.getLocaleShortDateString(d)](#ChartRenderer+getLocaleShortDateString) ⇒ <code>string</code>
    * [.bindEvent()](#ChartRenderer+bindEvent)
    * [.loadJSON(json)](#ChartRenderer+loadJSON) ⇒ <code>Array</code>

<a name="new_ChartRenderer_new"></a>

--------------------------------------------------------------------------------
### new ChartRenderer(container, viewController)
Open graph Chart Library (OG-Tree)


| Param | Type | Description |
| --- | --- | --- |
| container | <code>String</code> | Dom Element Id |
| viewController | <code>ChartViewController</code> |  |

<a name="ChartRenderer+dataTable"></a>

--------------------------------------------------------------------------------
### chartRenderer.dataTable : <code>null</code>
최종 데이터 테이블

**Kind**: instance property of <code>[ChartRenderer](#ChartRenderer)</code>  
<a name="ChartRenderer+finalRowData"></a>

--------------------------------------------------------------------------------
### chartRenderer.finalRowData : <code>Array</code>
최종 로우데이터

**Kind**: instance property of <code>[ChartRenderer](#ChartRenderer)</code>  
<a name="ChartRenderer+connections"></a>

--------------------------------------------------------------------------------
### chartRenderer.connections : <code>Array</code>
재구성될 커넥션 리스트

**Kind**: instance property of <code>[ChartRenderer](#ChartRenderer)</code>  
<a name="ChartRenderer+existConnections"></a>

--------------------------------------------------------------------------------
### chartRenderer.existConnections : <code>Array</code>
재구성 된 커넥션 edgeId 리스트

**Kind**: instance property of <code>[ChartRenderer](#ChartRenderer)</code>  
<a name="ChartRenderer+existCells"></a>

--------------------------------------------------------------------------------
### chartRenderer.existCells : <code>Array</code>
뷰 모드일시 그려진 셀 리스트
rowIndex + '-' + column 으로 표현한다.

**Kind**: instance property of <code>[ChartRenderer](#ChartRenderer)</code>  
<a name="ChartRenderer+init"></a>

--------------------------------------------------------------------------------
### chartRenderer.init()
캔버스를 초기 빌드한다.  최초 1번만 실행된다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  
<a name="ChartRenderer+getScale"></a>

--------------------------------------------------------------------------------
### chartRenderer.getScale() ⇒ <code>Number</code>
Scale 을 반환한다. (리얼 사이즈 : Scale = 1)

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  
**Returns**: <code>Number</code> - 스케일값  
<a name="ChartRenderer+setScale"></a>

--------------------------------------------------------------------------------
### chartRenderer.setScale(scale)
Scale 을 설정한다. (기본 사이즈 : Scale = 1)

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| scale | <code>Number</code> | 스케일값 |

<a name="ChartRenderer+getColumnByField"></a>

--------------------------------------------------------------------------------
### chartRenderer.getColumnByField(columns, field) ⇒ <code>\*</code>
칼럼 이름으로 칼럼 옵션을 얻어온다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| columns | <code>Array</code> | 칼럼리스트 |
| field | <code>String</code> | 칼럼명 |

<a name="ChartRenderer+getColorFromState"></a>

--------------------------------------------------------------------------------
### chartRenderer.getColorFromState(state) ⇒ <code>\*</code>
스테이터스를 컬러로 바꾼다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>String</code> | 스테이터스 |

<a name="ChartRenderer+getDataTableRenderer"></a>

--------------------------------------------------------------------------------
### chartRenderer.getDataTableRenderer() ⇒ <code>tableRenderer</code>
데이터 테이블의 렌더러를 정의하여 리턴한다. value 를 shape 로 변환하는 로직이 담겨있다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  
<a name="ChartRenderer+getDataRowByCode"></a>

--------------------------------------------------------------------------------
### chartRenderer.getDataRowByCode(funcCode, rows, rowIndexMapByCode) ⇒ <code>\*</code>
팀에 해당하는 data row 를 반환한다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| funcCode | <code>String</code> | cur_eng_func_code |
| rows | <code>Array</code> | rows 데이터 |
| rowIndexMapByCode | <code>Map</code> | rowIndexMapByCode |

<a name="ChartRenderer+getExistActivityFromRowsData"></a>

--------------------------------------------------------------------------------
### chartRenderer.getExistActivityFromRowsData(activity, rows) ⇒ <code>\*</code>
rows 데이터 를 조회하여, 주어진 액티비티에 해당하는 정보를 반환한다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| activity | <code>Map</code> | activity 정보 |
| rows | <code>Array</code> | rows 데이터 |

<a name="ChartRenderer+getElementByActivityId"></a>

--------------------------------------------------------------------------------
### chartRenderer.getElementByActivityId(activityId) ⇒ <code>\*</code>
액티비티 아이디로 엘리먼트를 찾는다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| activityId | <code>String</code> | 액티비티 아이디 |

<a name="ChartRenderer+keepEdges"></a>

--------------------------------------------------------------------------------
### chartRenderer.keepEdges() ⇒ <code>Array</code>
화면의 Edge 를 연결 해제하고, 재연결 정보를 저장한다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  
**Returns**: <code>Array</code> - connections  
<a name="ChartRenderer+renderByContainer"></a>

--------------------------------------------------------------------------------
### chartRenderer.renderByContainer()
캔버스의 컨테이너 영역(화면상에 나타난 영역) 만큼만 액티비티를 그린다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  
<a name="ChartRenderer+renderEdges"></a>

--------------------------------------------------------------------------------
### chartRenderer.renderEdges()
기존 JSON 맵에 포함된 연결정보를 재구성한다.
한번 재구성된 연결정보는 다시 구성하지 않는다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  
<a name="ChartRenderer+render"></a>

--------------------------------------------------------------------------------
### chartRenderer.render(chartData, existJson)
데이터를 기반으로 화면에 렌더링한다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| chartData | <code>Map</code> | Aras 에서 가져온 데이터 |
| existJson | <code>Map</code> | 기존에 저장된 맵데이터 |

<a name="ChartRenderer+labelSubstring"></a>

--------------------------------------------------------------------------------
### chartRenderer.labelSubstring(label) ⇒ <code>String</code>
주어진 라벨이 최대 표기 숫자를 넘길 경우 텍스트를 줄인다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  
**Returns**: <code>String</code> - fixed label  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | 라벨 |

<a name="ChartRenderer+emptyString"></a>

--------------------------------------------------------------------------------
### chartRenderer.emptyString(value) ⇒ <code>boolean</code>
주어진 스트링이 빈값인지를 확인한다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  
**Returns**: <code>boolean</code> - 빈 값 여부  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | 판별할 값 |

<a name="ChartRenderer+getElementByPoint"></a>

--------------------------------------------------------------------------------
### chartRenderer.getElementByPoint(point) ⇒ <code>Element</code>
좌표값을 포함하는 가장 앞단의 엘리먼트를 반환한다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  
**Returns**: <code>Element</code> - Dom Element  

| Param | Description |
| --- | --- |
| point | [x,y] 좌표 |

<a name="ChartRenderer+uuid"></a>

--------------------------------------------------------------------------------
### chartRenderer.uuid() ⇒ <code>string</code>
무작위 랜덤 아이디 생성

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  
**Returns**: <code>string</code> - 랜덤 아이디  
<a name="ChartRenderer+getLocaleShortDateString"></a>

--------------------------------------------------------------------------------
### chartRenderer.getLocaleShortDateString(d) ⇒ <code>string</code>
Date 를 로컬 스트링으로 변환한다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  
**Returns**: <code>string</code> - Date String  

| Param | Type |
| --- | --- |
| d | <code>Date</code> | 

<a name="ChartRenderer+bindEvent"></a>

--------------------------------------------------------------------------------
### chartRenderer.bindEvent()
캔버스가 처음 렌더링 될 시 필요한 이벤트들을 바인딩한다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  
<a name="ChartRenderer+loadJSON"></a>

--------------------------------------------------------------------------------
### chartRenderer.loadJSON(json) ⇒ <code>Array</code>
오픈그래프 맵 데이터를 분석하여 json 형태의 elements 리스트로 반환한다.

**Kind**: instance method of <code>[ChartRenderer](#ChartRenderer)</code>  
**Returns**: <code>Array</code> - elements  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>Map</code> | 오픈그래프 맵데이터 |

