import * as ErazLib from "eraz-lib";


export function SizeSelector(layer : number) : number
{
	if      (layer === 1) return (ErazLib.Primitive.Number.Utils.Random_Integer(3, 4));
	else if (layer === 2) return (ErazLib.Primitive.Number.Utils.Random_Integer(2, 3));
	else if (layer === 3) return (ErazLib.Primitive.Number.Utils.Random_Integer(1, 2));
	else                  return (0);
};

export function ColorSelector(layer : number) : string
{
	let transparency:number;

	if      (layer === 1) transparency = ErazLib.Primitive.Number.Utils.Random_Float(0.7, 1);
	else if (layer === 2) transparency = ErazLib.Primitive.Number.Utils.Random_Float(0.5, 0.7);
	else if (layer === 3) transparency = ErazLib.Primitive.Number.Utils.Random_Float(0.4, 0.5);
	else                  transparency = 0;

	return ("rgba(255, 255, 255, " + transparency + ")");
};
