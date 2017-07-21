<a name="ChartViewController"></a>

## ChartViewController
**Kind**: global class  
**Author:** <a href="mailto:sppark@uengine.org">Seungpil Park</a>  

* [ChartViewController](#ChartViewController)
    * [new ChartViewController()](#new_ChartViewController_new)
    * [.renderer](#ChartViewController+renderer) : <code>Tree</code>
    * [.aras](#ChartViewController+aras) : <code>Aras</code>
    * [.editMode](#ChartViewController+editMode) : <code>string</code>
    * [.getChartStateJson()](#ChartViewController+getChartStateJson) ⇒ <code>null</code> &#124; <code>\*</code>
    * [.init()](#ChartViewController+init)
    * [.startRender()](#ChartViewController+startRender)
    * [.renderStateBox()](#ChartViewController+renderStateBox)
    * [.renderHeaders(headerItem)](#ChartViewController+renderHeaders)
    * [.getSampleData(callback)](#ChartViewController+getSampleData)

<a name="new_ChartViewController_new"></a>

--------------------------------------------------------------------------------
### new ChartViewController()
ChartViewController html view Handler

<a name="ChartViewController+renderer"></a>

--------------------------------------------------------------------------------
### chartViewController.renderer : <code>Tree</code>
ChartRenderer 클래스

**Kind**: instance property of <code>[ChartViewController](#ChartViewController)</code>  
<a name="ChartViewController+aras"></a>

--------------------------------------------------------------------------------
### chartViewController.aras : <code>Aras</code>
Aras 클래스

**Kind**: instance property of <code>[ChartViewController](#ChartViewController)</code>  
<a name="ChartViewController+editMode"></a>

--------------------------------------------------------------------------------
### chartViewController.editMode : <code>string</code>
Edit 모드

**Kind**: instance property of <code>[ChartViewController](#ChartViewController)</code>  
<a name="ChartViewController+getChartStateJson"></a>

--------------------------------------------------------------------------------
### chartViewController.getChartStateJson() ⇒ <code>null</code> &#124; <code>\*</code>
차트의 스테이터스 컬러 정보를 가져온다.

**Kind**: instance method of <code>[ChartViewController](#ChartViewController)</code>  
<a name="ChartViewController+init"></a>

--------------------------------------------------------------------------------
### chartViewController.init()
Html 페이지가 처음 로딩되었을 때 차크 렌더러를 활성화하고, 데이터를 불러온다.

**Kind**: instance method of <code>[ChartViewController](#ChartViewController)</code>  
<a name="ChartViewController+startRender"></a>

--------------------------------------------------------------------------------
### chartViewController.startRender()
챠트 렌더러가 렌더링을 시작하도록 한다.

**Kind**: instance method of <code>[ChartViewController](#ChartViewController)</code>  
<a name="ChartViewController+renderStateBox"></a>

--------------------------------------------------------------------------------
### chartViewController.renderStateBox()
common/chartState.json 에 저장된 스테이터스 데이터를 불러와 스테이터스 박스를 구성한다.

**Kind**: instance method of <code>[ChartViewController](#ChartViewController)</code>  
<a name="ChartViewController+renderHeaders"></a>

--------------------------------------------------------------------------------
### chartViewController.renderHeaders(headerItem)
Html 페이지의 헤더 부분에 프로젝트 정보를 표기한다.

**Kind**: instance method of <code>[ChartViewController](#ChartViewController)</code>  

| Param | Type | Description |
| --- | --- | --- |
| headerItem | <code>String</code> | 프로젝트 이름 |

<a name="ChartViewController+getSampleData"></a>

--------------------------------------------------------------------------------
### chartViewController.getSampleData(callback)
Dev 모드일시 개발용 샘플 데이터를 오픈그래프 트리에 반영한다.

**Kind**: instance method of <code>[ChartViewController](#ChartViewController)</code>  

| Param |
| --- |
| callback | 

