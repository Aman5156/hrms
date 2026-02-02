from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    lookup_field = 'employee_id'

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    @action(detail=False, methods=['post'])
    def mark_attendance(self, request):
        employee_id = request.data.get('employee_id')
        date = request.data.get('date')
        status_value = request.data.get('status')

        try:
            employee = Employee.objects.get(employee_id=employee_id)
        except Employee.DoesNotExist:
            return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)

        attendance, created = Attendance.objects.get_or_create(
            employee=employee,
            date=date,
            defaults={'status': status_value}
        )
        if not created:
            attendance.status = status_value
            attendance.save()

        serializer = self.get_serializer(attendance)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
