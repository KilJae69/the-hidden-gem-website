import { getBookedDatesByCabinId, getCabin } from "@/lib/data-service";

export async function GET(
  request: any,
  { params }: { params: { cabinId: number } }
) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(Number(cabinId)),
      getBookedDatesByCabinId(Number(cabinId)),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json("Cabin not found");
  }

  
}
