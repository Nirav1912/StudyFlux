export default function Button({
  children,
  className="",
  ...props
}){

return(

<button

className={`
px-6
py-3
rounded-2xl

font-semibold

transition-all

duration-300

bg-indigo-600

hover:bg-indigo-700

hover:scale-[1.03]

active:scale-95

text-white

shadow-lg

${className}

`}

{...props}

>

{children}

</button>

)

}