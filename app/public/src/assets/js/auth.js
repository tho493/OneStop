const token = localStorage.getItem('token');

async function checkToken() {
    if (!token) {
        window.location.href = '/login';
    } else {
        try {
            const response = await fetch('/api/authToken', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Dữ liệu:', data);
            } else if (response.status === 401) {
                alert("Bạn chưa đăng nhập, hãy đăng nhập lại");
                localStorage.removeItem('authToken');
                window.location.href = '/login';
            } else {
                alert('Có lỗi xảy ra:' + response.status);
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    }
}

checkToken();