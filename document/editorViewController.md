<a name="EditorViewController"></a>

## EditorViewController
**Kind**: global class  
**Author:** <a href="mailto:sppark@uengine.org">Seungpil Park</a>  

* [EditorViewController](#EditorViewController)
    * [new EditorViewController()](#new_EditorViewController_new)
    * [.tree](#EditorViewController+tree) : <code>Tree</code>
    * [.aras](#EditorViewController+aras) : <code>Aras</code>
    * [.mode](#EditorViewController+mode) : <code>string</code>
    * [.init()](#EditorViewController+init)
    * [.bindSelectBoxEvent()](#EditorViewController+bindSelectBoxEvent)
    * [.highLightSelectBoxWorkflow()](#EditorViewController+highLightSelectBoxWorkflow)
    * [.renderHeaders(headerItem, myOther)](#EditorViewController+renderHeaders)
    * [.renderStateBox()](#EditorViewController+renderStateBox)
    * [.renderSampleData()](#EditorViewController+renderSampleData)

<a name="new_EditorViewController_new"></a>

--------------------------------------------------------------------------------
### new EditorViewController()
Doosan html view Handler

<a name="EditorViewController+tree"></a>

--------------------------------------------------------------------------------
### editorViewController.tree : <code>Tree</code>
OG-Tree 클래스

**Kind**: instance property of <code>[EditorViewController](#EditorViewController)</code>  
<a name="EditorViewController+aras"></a>

--------------------------------------------------------------------------------
### editorViewController.aras : <code>Aras</code>
Aras 클래스

**Kind**: instance property of <code>[EditorViewController](#EditorViewController)</code>  
<a name="EditorViewController+mode"></a>

--------------------------------------------------------------------------------
### editorViewController.mode : <code>string</code>
Dev 모드

**Kind**: instance property of <code>[EditorViewController](#EditorViewController)</code>  
<a name="EditorViewController+init"></a>

--------------------------------------------------------------------------------
### editorViewController.init()
Html 페이지가 처음 로딩되었을 때 오픈그래프 트리를 활성화하고, 필요한 데이터를 인티그레이션 한다.

**Kind**: instance method of <code>[EditorViewController](#EditorViewController)</code>  
<a name="EditorViewController+bindSelectBoxEvent"></a>

--------------------------------------------------------------------------------
### editorViewController.bindSelectBoxEvent()
discipline, disciplineSpec, bg, 아더 워크플로우 셀렉트 박스 이벤트를 등록한다.

**Kind**: instance method of <code>[EditorViewController](#EditorViewController)</code>  
<a name="EditorViewController+highLightSelectBoxWorkflow"></a>

--------------------------------------------------------------------------------
### editorViewController.highLightSelectBoxWorkflow()
마이 워크플로우와 연계된 워크플로우 리스트를 셀렉트 박스 내에서 선택하여 하이라이트 시킨다.

**Kind**: instance method of <code>[EditorViewController](#EditorViewController)</code>  
<a name="EditorViewController+renderHeaders"></a>

--------------------------------------------------------------------------------
### editorViewController.renderHeaders(headerItem, myOther)
Html 페이지의 헤더 부분에 프로젝트 정보를 표기한다.

**Kind**: instance method of <code>[EditorViewController](#EditorViewController)</code>  

| Param |
| --- |
| headerItem | 
| myOther | 

<a name="EditorViewController+renderStateBox"></a>

--------------------------------------------------------------------------------
### editorViewController.renderStateBox()
common/state.json 에 저장된 스테이터스 데이터를 불러와 스테이터스 박스를 구성한다.

**Kind**: instance method of <code>[EditorViewController](#EditorViewController)</code>  
<a name="EditorViewController+renderSampleData"></a>

--------------------------------------------------------------------------------
### editorViewController.renderSampleData()
Dev 모드일시 개발용 샘플 데이터를 오픈그래프 트리에 반영한다.

**Kind**: instance method of <code>[EditorViewController](#EditorViewController)</code>  
