const Geact = {
    createElement,
    render
}

function createElement(type: string, props: object, children: any) {
    return {
        type,
        props: {
            ...props,
            children: children.map((child: any) => {
                typeof child === "object" ? child : createTextElement(child)
            })
        }
    }
}

function createTextElement(text: string) {
    return {
        type: "TextElement",
        props: {
            value: text,
            children: []
        }
    }
}

function render(element: any, container: any) {
    const dom = element.type === "TextElement"
        ? document.createTextNode("")
        : document.createElement(element.type)

    const isProperty = (key: any) => key !== "children"
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom.setAttribute(name, element.props[name])
        })

    element.props.children.forEach((child: any) =>
        render(child, dom)
    )

    container.appendChild(dom)
}


/** @jsx Geact.createElement */
const element = (
    <div style={{ background: 'salmon' }} >
        <h1>Hello World</h1>
        <h2 style={{ textAlign: 'right' }} > from Geact </h2>
    </div>
);
const container = document.getElementById("root");
Geact.render(element, container);