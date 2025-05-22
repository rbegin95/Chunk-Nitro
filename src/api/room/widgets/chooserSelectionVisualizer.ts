import { IRoomObjectSpriteVisualization, RoomObjectCategory } from '@nitrots/nitro-renderer';
import { ChooserSelectionFilter, GetRoomEngine } from '../..';

const glowFilter = new ChooserSelectionFilter(
    [0.721, 0.886, 0.988],
    [0.288, 0.354, 0.395]
);

export class chooserSelectionVisualizer
{
    public static show(id: number, category: number = RoomObjectCategory.FLOOR): void
    {
        const roomObject = GetRoomEngine().getRoomObject(GetRoomEngine().activeRoomId, id, category);
        if(!roomObject) return;

        const visualization = roomObject.visualization as IRoomObjectSpriteVisualization;
        if (!visualization || !visualization.sprites || !visualization.sprites.length) return;


        for(const sprite of visualization.sprites)
        {
            if(sprite.blendMode === 1) continue;
            sprite.filters = [ glowFilter ];
        }
    }

    public static hide(id: number, category: number = RoomObjectCategory.FLOOR): void
    {
        const roomObject = GetRoomEngine().getRoomObject(GetRoomEngine().activeRoomId, id, category);
        if(!roomObject) return;

        const visualization = roomObject.visualization as IRoomObjectSpriteVisualization;
        if(!visualization) return;

        for(const sprite of visualization.sprites) sprite.filters = [];
    }

    public static clearAll(): void
{
    const roomEngine = GetRoomEngine();

    const roomObjects = [
        ...roomEngine.getRoomObjects(roomEngine.activeRoomId, RoomObjectCategory.FLOOR),
        ...roomEngine.getRoomObjects(roomEngine.activeRoomId, RoomObjectCategory.WALL)
    ];

    for(const roomObject of roomObjects)
    {
        const visualization = roomObject.visualization as IRoomObjectSpriteVisualization;

        if(!visualization) continue;

        for(const sprite of visualization.sprites) sprite.filters = [];
    }
}

}
