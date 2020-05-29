export const useInput = (initialValue, validator) => {
    const [value, setValue] = useState(initialValue);
    const onChange = event => {
        const {target: {
                value
            }} = event;
        let willUpdate = true;
        if (typeof validator === "function") {
            willUpdate = validator(value);
        }
        if (willUpdate) {
            setValue(value);
        }
    };
    return {value, onChange};
};


// 이 밑에서 부턴 App.js에 쓰는 것. 즉, 위의 함수가 useInput이고
// useInput을 활용한 것을 보여주는 예시
const App = () => {
    /* const maxLen = value => value.length <= 10; */
    const maxLen = value => !value.includes("@");
    const name = useInput("jimin", maxLen);
    return (
        <div className="App">
            <h1>Hello</h1>
            {/* value={name.value} 대신 {...name} 으로 쓸 수 있다. */}
            <input placeholder="name" value={name.value} onChange={name.onChange}/>
        </div>
    );
};
