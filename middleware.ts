import { NextResponse } from "next/server";

export default function middleware(request: Request) {
	console.log(request.url);
	return NextResponse.next();
}
