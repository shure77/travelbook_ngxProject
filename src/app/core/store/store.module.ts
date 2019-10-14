import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { PlaceState } from '@app/core/store/state/place.state';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      PlaceState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      storage: StorageOption.SessionStorage
    }),
  ],
  exports: [NgxsModule]
})
export class StoreModule {}
