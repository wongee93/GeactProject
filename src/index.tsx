const Geact = {
    createElement,
    render
}

function createElement(type: string, props: object, ...children: any[]) {
    const childrenArray = Array.isArray(children) ? children : [children];
    return {
        type,
        props: {
            ...props,
            children: childrenArray.map((child: any) => {
                return (
                    typeof child === "object"
                        ? child
                        : createTextElement(child)
                )
            })
        }
    }
}

function createTextElement(text: string) {
    return {
        type: "TextElement",
        props: {
            nodeValue: text,
            children: []
        }
    }
}

function createDom(fiber: any) {
    const dom = fiber.type === "TextElement"
        ? document.createTextNode("")
        : document.createElement(fiber.type)

    updateDom(dom, {}, fiber.props)

    return dom
}

// dom prop 중, Event prop 필터링
const isEvent = (key: string) => key.startsWith("on")
// dom prop 중, Event와 children을 제외한 prop 선택
const isProperty = (key: any) =>
    key !== "children" && !isEvent(key)
// 이전 요소와 다음 요소가 같지 않을 때 true
const isNew = (prev: any, next: any) => (key: any) =>
    prev[key] !== next[key]
// 다음 요소가 아닌 값들(유효하지 않은, 지난 값들)일 때 true
const isPast = (prev: any, next: any) => (key: any) => !(key in next)

function updateDom(dom: any, prevProps: any, nextProps: any) {
    // prevProps eventlistener 제거
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2)
            dom.removeEventListener(
                eventType,
                prevProps[name]
            )
        })

    // prevProps props 제거
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isPast(prevProps, nextProps))
        .forEach(name => {
            dom[name] = ""
        })

    // nextProps props 추가
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            dom[name] = nextProps[name]
        })

    // nextProps eventlistener 추가
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2)
            dom.addEventListener(
                eventType,
                nextProps[name]
            )
        })
}

function render(element: any, container: any) {


    const isProperty = (key: any) => key !== "children"
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            if (name === 'style') {
                Object.assign(dom.style, element.props[name])
            } else {
                dom[name] = element.props[name]
            }
        })

    element.props.children.forEach((child: any) =>
        render(child, dom)
    )

    container.appendChild(dom)
}

/** @jsx Geact.createElement */
function Counter() {
    const [state, setState] = Geact.useState(1)
    return (
        <h1 onClick={() => setState(c => c + 1)}>
            Count : {state}
        </h1>
    )
}
const element = <Counter />
const container = document.getElementById("root");
Geact.render(element, container);
