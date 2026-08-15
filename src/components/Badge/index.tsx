
const Badge = (props: any) => {
    return (
        <span
            className={`inline-block py-1 px-4 rounded-full text-[11px] capitalize ${props.status === "confirm"
                ? "bg-green-500 text-white"
                : props.status === "pending"
                    ? "bg-yellow-500 text-white"
                    : props.status === "delivered"
                        ? "bg-blue-500 text-white"
                        : "bg-primary text-white"
                }`}
        >
            {props.status}
        </span>
    )
}

export default Badge;