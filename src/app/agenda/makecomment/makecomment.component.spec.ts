import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakecommentComponent } from './makecomment.component';

describe('MakecommentComponent', () => {
  let component: MakecommentComponent;
  let fixture: ComponentFixture<MakecommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakecommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakecommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
